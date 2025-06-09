import { useEffect, useState } from "react";
import UploadProductModal from "../../components/admin/UploadProductModal";
import axios from "axios";
import AdminProductCard from "../../components/admin/AdminProductCard";
import FilterNav from "../../components/FilterNav";
import toast from "react-hot-toast";

const ProductManagement = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("upload");
    const [loading, setLoading] = useState(false);

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [showOutOfStockOnly, setShowOutOfStockOnly] = useState(false);

    async function fetchAllProducts() {
        const token = localStorage.getItem("token");
        try {
            setLoading(true);
            const result = await axios.get(
                `${import.meta.env.VITE_API_URL}/fetch-products`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setProducts(result.data.products);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const handleModalToggle = () => {
        setModalOpen((prev) => !prev);
        setSelectedProduct(null);
        setModalMode("upload");
    };
    const handleEdit = (product) => {
        setSelectedProduct(product);
        setModalMode("edit");
        setModalOpen(true);
    };

    async function handleDelete(product) {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const result = await axios.delete(
                `${import.meta.env.VITE_API_URL}/delete-product?productId=${
                    product._id
                }`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success(result.data.message, {
                style: {
                    border: "1px solid black",
                    padding: "16px",
                    color: "black",
                },
                iconTheme: { primary: "black", secondary: "white" },
            });

            fetchAllProducts();
        } catch (err) {
            console.log(err);
            toast.error("Error while deleting the product", {
                style: {
                    border: "1px solid black",
                    padding: "16px",
                    color: "black",
                },
                iconTheme: { primary: "black", secondary: "white" },
            });
        } finally {
            setLoading(false);
        }
    }

    const categories = [
        "Airdopes",
        "Camera",
        "Earphone",
        "Mobile",
        "Mouse",
        "Printer",
        "Processor",
        "Refrigerator",
        "Speaker",
        "Trimmer",
        "TV",
        "Watch",
    ];

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [sortOption, setSortOption] = useState("");

    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const handleSortChange = (value) => setSortOption(value);

    const filteredProducts = products
        .filter(
            (p) =>
                selectedCategories.length === 0 ||
                selectedCategories.includes(p.category)
        )
        .filter((p) => (showOutOfStockOnly ? p.quantity === 0 : true))
        .sort((a, b) => {
            if (sortOption === "price_low_high")
                return a.sellingPrice - b.sellingPrice;
            if (sortOption === "price_high_low")
                return b.sellingPrice - a.sellingPrice;
            if (sortOption === "name_az") return a.name.localeCompare(b.name);
            if (sortOption === "name_za") return b.name.localeCompare(a.name);
            return 0;
        });

    return (
        <div className="px-4 py-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold font-sans">
                    Product Management
                </h1>
                <button
                    type="button"
                    onClick={handleModalToggle}
                    className="text-white cursor-pointer bg-black rounded-sm w-40 h-10 hover:bg-gray-800 transition-colors duration-300"
                >
                    Upload Product
                </button>
            </div>

            {/* Out of Stock Filter Toggle */}
            <div className="mb-4">
                <label className="inline-flex items-center space-x-2 text-black">
                    <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-black"
                        checked={showOutOfStockOnly}
                        onChange={() => setShowOutOfStockOnly((prev) => !prev)}
                    />
                    <span>Show Out of Stock Only</span>
                </label>
            </div>

            {/* Loading or No Products Message */}
            <div className="min-h-[100px] flex items-center justify-center mb-6">
                {loading ? (
                    <p className="text-center text-black text-lg">
                        Loading products...
                    </p>
                ) : !loading && filteredProducts.length === 0 ? (
                    <p className="text-center text-black text-lg">
                        No products found.
                    </p>
                ) : null}
            </div>

            {/* Product Grid */}
            {!loading && filteredProducts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
                    {filteredProducts.map((product) => (
                        <AdminProductCard
                            key={product._id}
                            product={{
                                ...product,
                                image: product.images?.[0] || "",
                            }}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            {/* FilterNav appears only if products exist */}
            {!loading && filteredProducts.length > 0 && (
                <FilterNav
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onCategoryChange={handleCategoryChange}
                    sortOption={sortOption}
                    onSortChange={handleSortChange}
                />
            )}

            {/* Upload Product Modal */}
            {modalOpen && (
                <UploadProductModal
                    open={modalOpen}
                    onClose={handleModalToggle}
                    fetchAllProducts={fetchAllProducts}
                    mode={modalMode}
                    productData={selectedProduct}
                />
            )}
        </div>
    );
};

export default ProductManagement;
