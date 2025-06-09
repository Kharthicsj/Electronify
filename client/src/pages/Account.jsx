import { useContext, useState } from "react";
import Context from "../context";
import Header from "../components/Header";
import AccountBanner from "../assets/AccountBanner.jpeg";
import axios from "axios";
import { useEffect } from "react";

const Account = () => {
    const { userData } = useContext(Context);
    const [activeTab, setActiveTab] = useState("account");
    const [loading, setLoading] = useState(false);

    const [orderData, setOrderData] = useState([]);

    async function getOrderDetails() {
        const token = localStorage.getItem("token");
        try {
            setLoading(true);
            const result = await axios.get(
                `${import.meta.env.VITE_API_URL}/get-orders`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setOrderData(result.data.orders);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getOrderDetails();
    }, []);

    return (
        <div>
            <Header />

            {/* Banner */}
            <div>
                <div className="w-full">
                    <img
                        src={AccountBanner}
                        alt="Account Banner"
                        className="w-full h-[200px] p-4 object-contain sm:h-[250px] md:h-[300px]"
                    />
                </div>
                {/* Tabs */}
                <div className="flex gap-6 px-6 lg:px-16 mt-6">
                    <button
                        onClick={() => setActiveTab("account")}
                        className={`text-lg cursor-pointer font-semibold border-b-2 pb-1 ${
                            activeTab === "account"
                                ? "border-black text-black"
                                : "border-transparent text-gray-500"
                        }`}
                    >
                        My Account
                    </button>
                    <button
                        onClick={() => setActiveTab("orders")}
                        className={`text-lg cursor-pointer font-semibold border-b-2 pb-1 ${
                            activeTab === "orders"
                                ? "border-black text-black"
                                : "border-transparent text-gray-500"
                        }`}
                    >
                        My Orders
                    </button>
                </div>
                {/* Content */}
                <div className="px-6 lg:px-16 mt-8">
                    {activeTab === "account" ? (
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* User Info */}
                            <div className="bg-white shadow rounded-xl p-6">
                                <h2 className="text-xl font-semibold mb-4">
                                    User Information
                                </h2>
                                <div className="space-y-3 text-gray-800">
                                    <p>
                                        <span className="font-semibold">
                                            Username:
                                        </span>{" "}
                                        {userData.username}
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            Email:
                                        </span>{" "}
                                        {userData.email}
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            Role:
                                        </span>{" "}
                                        {userData.role}
                                    </p>
                                    <p>
                                        <span className="font-semibold">
                                            Joined On:
                                        </span>{" "}
                                        {new Date(
                                            userData.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            {/* Address Info */}
                            <div className="bg-white shadow rounded-xl p-6">
                                <h2 className="text-xl font-semibold mb-4">
                                    Saved Addresses
                                </h2>
                                {Array.isArray(userData?.address) ? (
                                    userData.address.length === 0 ? (
                                        <p className="text-gray-600">
                                            You have no saved addresses.
                                        </p>
                                    ) : (
                                        <div className="space-y-4">
                                            {userData.address.map(
                                                (addr, index) => (
                                                    <div
                                                        key={index}
                                                        className="border rounded-lg p-4 text-gray-800 bg-gray-50"
                                                    >
                                                        <p>
                                                            <span className="font-semibold">
                                                                Name:
                                                            </span>{" "}
                                                            {addr.name}
                                                        </p>
                                                        <p>
                                                            <span className="font-semibold">
                                                                Street:
                                                            </span>{" "}
                                                            {addr.addressLine}
                                                        </p>
                                                        <p>
                                                            <span className="font-semibold">
                                                                City:
                                                            </span>{" "}
                                                            {addr.city}
                                                        </p>
                                                        <p>
                                                            <span className="font-semibold">
                                                                State:
                                                            </span>{" "}
                                                            {addr.state}
                                                        </p>
                                                        <p>
                                                            <span className="font-semibold">
                                                                Pincode:
                                                            </span>{" "}
                                                            {addr.pincode}
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )
                                ) : (
                                    <p className="text-gray-600">
                                        Loading address information...
                                    </p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white shadow rounded-xl p-6">
                            <h2 className="text-xl font-semibold mb-4">
                                My Orders
                            </h2>
                            {orderData.length === 0 ? (
                                <p className="text-gray-600">
                                    You have no orders yet.
                                </p>
                            ) : (
                                <div className="space-y-6">
                                    {orderData.map((order, index) => {
                                        const statusColor =
                                            order.orderStatus === "Pending"
                                                ? "text-yellow-600 bg-yellow-100"
                                                : order.orderStatus ===
                                                  "Shipped"
                                                ? "text-blue-600 bg-blue-100"
                                                : order.orderStatus ===
                                                  "Delivered"
                                                ? "text-green-600 bg-green-100"
                                                : "text-red-600 bg-red-100";
                                        return (
                                            <div
                                                key={index}
                                                className="border rounded-lg p-4 bg-gray-50"
                                            >
                                                <div className="flex justify-between items-center mb-2">
                                                    <h3 className="font-semibold text-lg">
                                                        Order #{index + 1}
                                                    </h3>
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}
                                                    >
                                                        {order.orderStatus}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 mb-1">
                                                    <span className="font-semibold">
                                                        Order Date:
                                                    </span>{" "}
                                                    {new Date(
                                                        order.orderDate
                                                    ).toLocaleString()}
                                                </p>
                                                <p className="text-sm text-gray-600 mb-3">
                                                    <span className="font-semibold">
                                                        Payment Method:
                                                    </span>{" "}
                                                    {order.paymentMethod} |
                                                    <span className="ml-2 font-semibold">
                                                        Payment Status:
                                                    </span>{" "}
                                                    {order.paymentStatus}
                                                </p>
                                                <div className="text-gray-800 mb-3">
                                                    <h4 className="font-semibold">
                                                        Shipping Address:
                                                    </h4>
                                                    <p>
                                                        {order.addressInfo.name}
                                                    </p>
                                                    <p>
                                                        {
                                                            order.addressInfo
                                                                .addressLine
                                                        }
                                                    </p>
                                                    <p>
                                                        {order.addressInfo.city}
                                                        ,{" "}
                                                        {
                                                            order.addressInfo
                                                                .state
                                                        }{" "}
                                                        -{" "}
                                                        {
                                                            order.addressInfo
                                                                .pincode
                                                        }
                                                    </p>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-800 mb-1">
                                                        Items:
                                                    </h4>
                                                    <ul className="list-disc ml-6 text-sm text-gray-700">
                                                        {order.cartItems.map(
                                                            (item, i) => (
                                                                <li key={i}>
                                                                    Product ID:{" "}
                                                                    {
                                                                        item.productId
                                                                    }{" "}
                                                                    | Qty:{" "}
                                                                    {
                                                                        item.quantity
                                                                    }{" "}
                                                                    | $
                                                                    {item.price}
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                                <div className="mt-4 text-right">
                                                    <span className="font-bold text-lg">
                                                        Total: $
                                                        {order.totalAmount}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Account;
