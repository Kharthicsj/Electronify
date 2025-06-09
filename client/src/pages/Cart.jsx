import React, { useContext, useEffect, useState } from "react";
import Context from "../context";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";

import { FaTrash, FaShoppingCart } from "react-icons/fa";

const Cart = () => {
    const { cartData, fetchCartItems } = useContext(Context);
    const navigate = useNavigate();
    const [subtotal, setSubtotal] = useState(0);
    const [productData, setProductData] = useState([]);

    const productIds = cartData.map((item) => item.productId._id);

    async function fetchProductData() {
        try {
            const allProducts = [];

            for (const id of productIds) {
                const res = await axios.get(
                    `${
                        import.meta.env.VITE_API_URL
                    }/fetch-product?productId=${id}`
                );
                if (res.data && res.data.productData) {
                    allProducts.push(res.data.productData);
                }
            }

            setProductData(allProducts);
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    }

    useEffect(() => {
        if (productIds.length > 0) {
            fetchProductData();
        }
    }, [cartData]);

    useEffect(() => {
        const total = cartData.reduce((acc, item) => {
            const price = item.productId.sellingPrice || 0;
            return acc + price * item.quantity;
        }, 0);
        setSubtotal(total);
    }, [cartData]);

    const getProductById = (id) => {
        return productData.find((p) => p._id === id);
    };

    const handleQuantityChange = async (cartItemId, newQty, productId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.patch(
                `${import.meta.env.VITE_API_URL}/update-cart`,
                {
                    cartItemId,
                    quantity: Number(newQty),
                    productId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchCartItems();
            console.log(
                `Updated quantity for cart item ${cartItemId} to ${newQty} (product ${productId})`
            );
        } catch (error) {
            console.error("Error updating cart quantity:", error);
        }
    };

    const handleDeleteCartItem = async (productId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/delete-cart-item`,
                {
                    data: { productId },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            fetchCartItems();
        } catch (err) {
            console.error("Failed to delete cart item:", err);
        }
    };

    if (cartData.length === 0) {
        return (
            <div>
                <Header />
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
                    <FaShoppingCart className="text-7xl text-gray-400 mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                        Your Cart is Empty
                    </h2>
                    <p className="text-gray-500 mb-4">Add items to it now.</p>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-black hover:bg-gray-700 text-white px-6 py-2 rounded transition"
                    >
                        Shop Now
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className="bg-gray-100 min-h-screen p-4 md:p-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white p-6 rounded shadow">
                        <h2 className="text-xl font-semibold mb-4">
                            Shopping Cart
                        </h2>
                        <div className="divide-y">
                            {cartData.map((item) => {
                                const product = item.productId;
                                const freshProduct = getProductById(
                                    product._id
                                );
                                const availableQty =
                                    freshProduct?.quantity ?? 1;

                                return (
                                    <div
                                        key={item._id}
                                        className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 py-6"
                                    >
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={product.images?.[0]}
                                                alt={product.name}
                                                className="w-28 h-28 object-contain border rounded"
                                            />
                                            <div>
                                                <h3 className="text-lg font-semibold">
                                                    {product.name}
                                                </h3>
                                                <p className="text-black font-bold mt-2">
                                                    $
                                                    {product.sellingPrice.toLocaleString()}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <select
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    handleQuantityChange(
                                                        item._id,
                                                        e.target.value,
                                                        product._id
                                                    )
                                                }
                                                className="border rounded p-1 cursor-pointer"
                                            >
                                                {Array.from(
                                                    { length: availableQty },
                                                    (_, i) => i + 1
                                                ).map((qty) => (
                                                    <option
                                                        key={qty}
                                                        value={qty}
                                                    >
                                                        {qty}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                onClick={() =>
                                                    handleDeleteCartItem(
                                                        product._id
                                                    )
                                                }
                                                className="text-red-600 hover:text-red-800 ml-2"
                                                title="Remove from cart"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded shadow h-fit sticky top-20">
                        <h3 className="text-lg font-semibold border-b pb-3 mb-3">
                            Price Details
                        </h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Charges</span>
                                <span className="text-green-600">Free</span>
                            </div>
                            <div className="border-t pt-3 mt-3 flex justify-between font-bold">
                                <span>Total</span>
                                <span>${subtotal.toLocaleString()}</span>
                            </div>
                        </div>
                        <button
                            onClick={() =>
                                navigate("/check-out", {
                                    state: { mode: "cart" },
                                })
                            }
                            className="w-full mt-6 cursor-pointer bg-black text-white py-2 rounded font-semibold hover:bg-gray-900 transition"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
