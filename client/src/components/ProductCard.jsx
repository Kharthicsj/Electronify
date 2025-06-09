import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
import toast from "react-hot-toast";
import Context from "../context";
import { FiShoppingCart } from "react-icons/fi";

function ProductCard(props) {
    const navigate = useNavigate();
    const { fetchCartItems, cartData } = useContext(Context);

    const { product } = props;
    const [loading, setLoading] = useState(false);

    const handleCardClick = () => {
        navigate(`product/${product._id}`);
    };

    const handleAddToCart = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/add-to-cart`,
                {
                    productId: product._id,
                    quantity: 1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                toast.success(response.data.message, {
                    style: {
                        border: "1px solid black",
                        padding: "16px",
                        color: "black",
                    },
                    iconTheme: { primary: "black", secondary: "white" },
                });
                fetchCartItems();
            } else {
                toast.error("Failed to Update Cart", {
                    style: {
                        border: "1px solid black",
                        padding: "16px",
                        color: "black",
                    },
                    iconTheme: { primary: "black", secondary: "white" },
                });
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        } finally {
            setLoading(false);
        }
    };

    const isInCart = cartData.some(
        (item) => item.productId._id === product._id
    );

    const handleBuyNow = (e) => {
        e.stopPropagation();
        navigate(`/check-out/${product._id}`, {
            state: {
                mode: "buy-now",
                product,
            },
        });
    };

    return (
        <div
            onClick={handleCardClick}
            className="bg-white text-black rounded-lg cursor-pointer shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300 relative"
        >
            {/* In Cart Icon */}
            {isInCart && (
                <div className="absolute top-2 right-2 z-50 bg-green-600 text-white p-1 rounded-full shadow-md">
                    <FiShoppingCart className="w-4 h-4" />
                </div>
            )}

            {/* Quantity Ribbon */}
            {product.quantity <= 10 && (
                <div className="absolute z-40 left-0 top-2 bg-red-500 text-white text-xs font-bold px-2 py-1 shadow-md w-[120px] text-center">
                    Only {product.quantity} left
                </div>
            )}

            {/* Product Image */}
            <div className="h-48 overflow-hidden bg-white">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Product Info */}
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 truncate">
                    {product.name}
                </h2>

                <div className="flex items-center gap-3 mb-4">
                    <span className="text-lg font-bold text-black">
                        USD {product.sellingPrice.toLocaleString()}
                    </span>
                    {product.sellingPrice !== product.price && (
                        <span className="text-gray-400 line-through text-sm">
                            USD {product.price.toLocaleString()}
                        </span>
                    )}
                </div>

                <div className="flex gap-3">
                    {!isInCart && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart();
                            }}
                            className="flex-1 cursor-pointer bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300 font-medium"
                        >
                            {loading ? "Loading..." : "Add to Cart"}
                        </button>
                    )}

                    <button
                        onClick={handleBuyNow}
                        className={`${
                            isInCart ? "w-full" : "flex-1"
                        } cursor-pointer bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300 font-medium`}
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
