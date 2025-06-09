import { useEffect, useState } from "react";
import BannerCarousel from "../components/BannerCarousel";
import Header from "../components/Header";
import CategoryListCard from "../components/CategoryListCard";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import {
    FaCamera,
    FaMobileAlt,
    FaMouse,
    FaPrint,
    FaMicrochip,
    FaTv,
} from "react-icons/fa";
import { MdOutlineAir, MdEarbuds, MdSpeaker, MdWatch } from "react-icons/md";
import { TbFridge } from "react-icons/tb";
import { RiScissorsLine } from "react-icons/ri";
import FilterNav from "../components/FilterNav";
import { Outlet } from "react-router-dom";

const homepage = () => {
    const [loading, setLoading] = useState(false);
    const [featuredProducts, setFeaturedProducts] = useState([]);

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

    const filteredFeaturedProducts = featuredProducts
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

    async function fetchFeaturedProducts() {
        try {
            setLoading(true);
            const result = await axios.get(
                `${import.meta.env.VITE_API_URL}/featured-products`
            );
            setFeaturedProducts(result.data.products);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchFeaturedProducts();
    }, []);

    const categories = [
        { category: "Airdopes", logo: <MdOutlineAir /> },
        { category: "Camera", logo: <FaCamera /> },
        { category: "Earphone", logo: <MdEarbuds /> },
        { category: "Mobile", logo: <FaMobileAlt /> },
        { category: "Mouse", logo: <FaMouse /> },
        { category: "Printer", logo: <FaPrint /> },
        { category: "Processor", logo: <FaMicrochip /> },
        { category: "Refrigerator", logo: <TbFridge /> },
        { category: "Speaker", logo: <MdSpeaker /> },
        { category: "Trimmer", logo: <RiScissorsLine /> },
        { category: "TV", logo: <FaTv /> },
        { category: "Watch", logo: <MdWatch /> },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {loading === true ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <Header />
                    <section className="p-4">
                        <BannerCarousel />
                    </section>
                    <section className="mt-10 py-10 bg-white">
                        <h1 className="text-3xl font-bold font-educursive text-center mb-8">
                            Shop By Category
                        </h1>
                        <div className="mt-10 max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 px-4">
                            {categories.map((item, index) => (
                                <CategoryListCard
                                    key={index}
                                    category={item.category}
                                    logo={item.logo}
                                />
                            ))}
                        </div>
                    </section>

                    <section className="mt-10 py-10 bg-white">
                        <h1 className="text-3xl font-bold font-educursive text-center mb-8">
                            Featured Products
                        </h1>

                        {loading ? (
                            <p className="text-center text-gray-500">
                                Loading...
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-6 md:px-10">
                                {filteredFeaturedProducts
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
                </div>
            )}
            <FilterNav
                categories={categories.map((cat) => cat.category)}
                selectedCategories={selectedCategories}
                sortOption={sortOption}
                onCategoryChange={handleCategoryChange}
                onSortChange={handleSortChange}
            />
            <Outlet />
        </div>
    );
};

export default homepage;
