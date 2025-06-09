import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Context from "../context";
import Header from "../components/Header";
import AddressInput from "../components/AddressInput";
import axios from "axios";

import { FaPencil, FaTrash } from "react-icons/fa6";
import toast from "react-hot-toast";

const CheckOut = () => {
    const { id } = useParams();
    const { userData, cartData } = useContext(Context);
    const [mode, setMode] = useState("cart");
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [showAddressPopup, setShowAddressPopup] = useState(false);
    const [editAddress, setEditAddress] = useState(null);
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    useEffect(() => {
        if (id) {
            setMode("buy-now");
            setLoading(true);
            axios
                .get(`${import.meta.env.VITE_API_URL}/fetch-product`, {
                    params: { productId: id },
                })
                .then((res) => setProduct(res.data.productData))
                .catch((err) => {
                    console.error("Failed to fetch product for buy now:", err);
                    setProduct(null);
                })
                .finally(() => setLoading(false));
        } else {
            setMode("cart");
            setProduct(null);
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (userData?.address?.length > 0) {
            setAddresses(userData.address);
        } else {
            setAddresses([]);
        }
    }, [userData]);

    const calculateCartTotal = () => {
        return cartData.reduce(
            (total, item) =>
                total + item.quantity * item.productId.sellingPrice,
            0
        );
    };

    const handleCheckout = async () => {
        setLoading(true);
        sessionStorage.setItem("paypalFlowStarted", "true");

        if (!selectedAddressId) {
            setLoading(false);
            toast.error("Please select an address.", {
                style: {
                    border: "1px solid black",
                    padding: "16px",
                    color: "black",
                },
                iconTheme: { primary: "black", secondary: "white" },
            });
            return;
        }

        const selectedAddress = addresses.find(
            (addr) => addr._id === selectedAddressId
        );
        if (!selectedAddress) {
            setLoading(false);
            toast.error("Selected address not found.", {
                style: {
                    border: "1px solid black",
                    padding: "16px",
                    color: "black",
                },
                iconTheme: { primary: "black", secondary: "white" },
            });
            return;
        }

        const token = localStorage.getItem("token");

        try {
            const payload = {
                addressInfo: selectedAddress,
                orderStatus: "Pending",
                paymentMethod: "PayPal",
                paymentStatus: "Success",
                orderDate: new Date(),
                orderUpdateDate: new Date(),
            };

            if (mode === "buy-now") {
                payload.cartItems = [
                    {
                        title: product.title,
                        productId: product._id,
                        price: product.price,
                        quantity: 1,
                    },
                ];
                payload.totalAmount = product.price;
                payload.cartId = [product._id];
            } else {
                if (!cartData || cartData.length === 0) {
                    toast.error("Your cart is empty.");
                    return;
                }

                payload.cartItems = cartData.map((item) => ({
                    title: item.productId.title,
                    productId: item.productId._id,
                    price: item.productId.sellingPrice,
                    quantity: item.quantity,
                }));

                payload.totalAmount = cartData.reduce(
                    (acc, item) =>
                        acc + item.productId.sellingPrice * item.quantity,
                    0
                );
            }

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/create-paypal-order`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const approvalUrl = response.data.approvalURL;

            if (approvalUrl) {
                window.location.href = approvalUrl;
            } else {
                toast.error("Unable to initiate PayPal checkout.", {
                    style: {
                        border: "1px solid black",
                        padding: "16px",
                        color: "black",
                    },
                    iconTheme: { primary: "black", secondary: "white" },
                });
            }
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error("Checkout failed.", {
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
    };

    const deleteAddress = async (addressId) => {
        const token = localStorage.getItem("token");
        try {
            const result = await axios.delete(
                `${import.meta.env.VITE_API_URL}/delete-address`,
                {
                    params: { addressId },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setAddresses((prev) =>
                prev.filter((addr) => addr._id !== addressId)
            );
            toast.success(result.data.message, {
                style: {
                    border: "1px solid black",
                    padding: "16px",
                    color: "black",
                },
                iconTheme: { primary: "black", secondary: "white" },
            });
        } catch (err) {
            console.error("Failed to delete address:", err);
            toast.error("Failed to delete address", {
                style: {
                    border: "1px solid black",
                    padding: "16px",
                    color: "black",
                },
                iconTheme: { primary: "black", secondary: "white" },
            });
        }
    };

    if (loading) {
        return (
            <div>
                <Header />
                <div className="min-h-screen flex items-center justify-center">
                    <p>Loading product details...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className="min-h-screen p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Left: Address Block */}
                <div className="md:col-span-2 bg-white rounded shadow p-4">
                    <h2 className="text-xl font-semibold mb-4">
                        Select Address
                    </h2>

                    {addresses.length > 0 ? (
                        <div className="space-y-4">
                            {addresses.map((addr, index) => (
                                <div
                                    key={index}
                                    onClick={() =>
                                        setSelectedAddressId(addr._id)
                                    }
                                    className={`border rounded p-4 flex justify-between items-start cursor-pointer ${
                                        selectedAddressId === addr._id
                                            ? "border-black bg-gray-100"
                                            : "border-gray-300"
                                    }`}
                                >
                                    <div>
                                        <p className="font-semibold">
                                            {addr.name}
                                        </p>
                                        <p>{addr.addressLine}</p>
                                        <p>
                                            {addr.city}, {addr.state} -{" "}
                                            {addr.pincode}
                                        </p>
                                    </div>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEditAddress(addr);
                                                setShowAddressPopup(true);
                                            }}
                                            className="text-black hover:text-gray-800"
                                        >
                                            <FaPencil />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteAddress(addr._id);
                                            }}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 mb-4">
                            No address found for this account.
                        </p>
                    )}

                    <button
                        onClick={() => setShowAddressPopup(true)}
                        className="mt-4 bg-black text-white px-4 py-2 rounded cursor-pointer"
                    >
                        Add New Address
                    </button>

                    {showAddressPopup && (
                        <AddressInput
                            onClose={() => {
                                setShowAddressPopup(false);
                                setEditAddress(addresses);
                            }}
                            onSave={() => {
                                setShowAddressPopup(false);
                                setEditAddress(addresses);
                            }}
                            initialData={editAddress}
                        />
                    )}
                </div>

                {/* Right: Checkout Summary */}
                <div className="bg-white rounded shadow p-4">
                    <h2 className="text-xl font-semibold mb-4">
                        Order Summary
                    </h2>
                    {mode === "buy-now" ? (
                        product ? (
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold">
                                            {product.name}
                                        </p>
                                        <p className="font-bold">
                                            Total: ${product.sellingPrice || 0}
                                        </p>
                                    </div>
                                    {product.images &&
                                        product.images.length > 0 && (
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="w-16 h-16 object-contain rounded ml-4"
                                            />
                                        )}
                                </div>

                                {selectedAddressId && (
                                    <div className="border border-gray-300 rounded p-3 mb-4 bg-gray-50">
                                        <h3 className="font-semibold mb-1">
                                            Deliver to:
                                        </h3>
                                        {(() => {
                                            const addr = addresses.find(
                                                (a) =>
                                                    a._id === selectedAddressId
                                            );
                                            return addr ? (
                                                <div>
                                                    <p>{addr.name}</p>
                                                    <p>{addr.addressLine}</p>
                                                    <p>
                                                        {addr.city},{" "}
                                                        {addr.state} -{" "}
                                                        {addr.pincode}
                                                    </p>
                                                </div>
                                            ) : null;
                                        })()}
                                    </div>
                                )}

                                <button
                                    onClick={handleCheckout}
                                    className="mt-6 bg-black text-white w-full py-2 rounded"
                                >
                                    {loading === true
                                        ? "Loading..."
                                        : "Pay with Paypal"}
                                </button>
                            </div>
                        ) : (
                            <p>Product details unavailable</p>
                        )
                    ) : (
                        <div className="flex flex-col gap-4">
                            {cartData.length === 0 ? (
                                <p>Your cart is empty</p>
                            ) : (
                                <>
                                    {cartData.map((item) => (
                                        <div
                                            key={item._id}
                                            className="border-b pb-2 flex items-center justify-between"
                                        >
                                            <div>
                                                <p className="font-semibold">
                                                    {item.productId.name}
                                                </p>
                                                <p>Qty: {item.quantity}</p>
                                                <p className="font-bold">
                                                    $
                                                    {item.quantity *
                                                        item.productId
                                                            .sellingPrice}
                                                </p>
                                            </div>
                                            {item.productId.images?.length >
                                                0 && (
                                                <img
                                                    src={
                                                        item.productId.images[0]
                                                    }
                                                    alt={item.productId.name}
                                                    className="w-16 h-16 object-contain rounded ml-4"
                                                />
                                            )}
                                        </div>
                                    ))}

                                    <p className="text-lg font-bold">
                                        Total: ${calculateCartTotal()}
                                    </p>

                                    {selectedAddressId && (
                                        <div className="border border-gray-300 rounded p-3 mb-4 bg-gray-50">
                                            <h3 className="font-semibold mb-1">
                                                Deliver to:
                                            </h3>
                                            {(() => {
                                                const addr = addresses.find(
                                                    (a) =>
                                                        a._id ===
                                                        selectedAddressId
                                                );
                                                return addr ? (
                                                    <div>
                                                        <p>{addr.name}</p>
                                                        <p>
                                                            {addr.addressLine}
                                                        </p>
                                                        <p>
                                                            {addr.city},{" "}
                                                            {addr.state} -{" "}
                                                            {addr.pincode}
                                                        </p>
                                                    </div>
                                                ) : null;
                                            })()}
                                        </div>
                                    )}

                                    <button
                                        onClick={handleCheckout}
                                        className="bg-black text-white w-full py-2 rounded cursor-pointer"
                                    >
                                        Proceed to Checkout
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
