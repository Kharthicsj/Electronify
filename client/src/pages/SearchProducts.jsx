import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import FilterNav from "../components/FilterNav";

function SearchProducts() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortOption, setSortOption] = useState("");

    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const handleSortChange = (value) => {
        setSortOption(value);
    };

    const filteredProducts = products
        .filter(
            (p) =>
                selectedCategories.length === 0 ||
                selectedCategories.includes(p.category)
        )
        .sort((a, b) => {
            if (sortOption === "price_low_high")
                return a.sellingPrice - b.sellingPrice;
            if (sortOption === "price_high_low")
                return b.sellingPrice - a.sellingPrice;
            if (sortOption === "name_az") return a.name.localeCompare(b.name);
            if (sortOption === "name_za") return b.name.localeCompare(a.name);
            return 0;
        });

    async function fetchSearchedProducts() {
        setLoading(true);
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/search-products?q=${query}`
            );
            setProducts(res.data.products || []);
        } catch (err) {
            console.error("Search fetch error:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (query.trim().length > 0) {
            fetchSearchedProducts();
        } else {
            navigate("/", { replace: true });
        }
    }, [query, navigate]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <section className="mt-10 py-10">
                <h1 className="text-3xl font-bold text-center mb-8 capitalize">
                    Results for: "{query}"
                </h1>

                {loading ? (
                    <p className="text-center text-gray-500">Searching...</p>
                ) : products.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No products found.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-6 md:px-10">
                        {filteredProducts
                            .filter((product) => product.quantity > 0)
                            .map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                    </div>
                )}
            </section>
            <FilterNav
                selectedCategories={selectedCategories}
                sortOption={sortOption}
                onCategoryChange={handleCategoryChange}
                onSortChange={handleSortChange}
            />
        </div>
    );
}

export default SearchProducts;
