import axios from "axios";
import { useEffect, useState } from "react";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getAllOrders() {
        const token = localStorage.getItem("token");
        try {
            setLoading(true);
            const result = await axios.get(
                `${import.meta.env.VITE_API_URL}/get-all-orders`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setOrders(result.data.orders);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleStatusChange(orderId, newStatus) {
        const token = localStorage.getItem("token");
        try {
            await axios.put(
                `${
                    import.meta.env.VITE_API_URL
                }/update-order-status/${orderId}`,
                { orderStatus: newStatus }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Update UI instantly (optional: you can refetch instead)
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId
                        ? { ...order, orderStatus: newStatus }
                        : order
                )
            );
        } catch (err) {
            console.error("Failed to update status", err);
        }
    }

    useEffect(() => {
        getAllOrders();
    }, []);

    return (
        <div className="p-6 lg:p-12">
            <h1 className="text-2xl font-bold mb-6">All Orders</h1>

            {loading ? (
                <p className="text-gray-600">Loading orders...</p>
            ) : orders.length === 0 ? (
                <p className="text-gray-600">No orders found.</p>
            ) : (
                <div className="grid gap-6">
                    {orders.map((order, index) => {
                        return (
                            <div
                                key={order._id}
                                className="bg-white p-6 shadow rounded-xl border"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-lg font-semibold">
                                        Order #{index + 1}
                                    </h2>

                                    {/* Dropdown for order status */}
                                    <select
                                        value={order.orderStatus}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                order._id,
                                                e.target.value
                                            )
                                        }
                                        className="bg-gray-100 border px-3 py-1 rounded text-sm"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">
                                            Delivered
                                        </option>
                                        <option value="Cancelled">
                                            Cancelled
                                        </option>
                                    </select>
                                </div>

                                <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                                    {/* Address Info */}
                                    <div>
                                        <h3 className="font-semibold text-base mb-1">
                                            Shipping Address
                                        </h3>
                                        <p>
                                            <strong>Name:</strong>{" "}
                                            {order.addressInfo.name}
                                        </p>
                                        <p>{order.addressInfo.addressLine}</p>
                                        <p>
                                            {order.addressInfo.city},{" "}
                                            {order.addressInfo.state} -{" "}
                                            {order.addressInfo.pincode}
                                        </p>
                                    </div>

                                    {/* Cart Items */}
                                    <div>
                                        <h3 className="font-semibold text-base mb-1">
                                            Items
                                        </h3>
                                        <ul className="list-disc list-inside space-y-1">
                                            {order.cartItems.map(
                                                (item, idx) => (
                                                    <li key={idx}>
                                                        Product ID:{" "}
                                                        <span className="text-black">
                                                            {item.productId}
                                                        </span>
                                                        <br />
                                                        Quantity:{" "}
                                                        {item.quantity}, Price:
                                                        ₹{item.price}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>

                                    {/* Payment & Date */}
                                    <div>
                                        <h3 className="font-semibold text-base mb-1">
                                            Payment Info
                                        </h3>
                                        <p>
                                            <strong>Method:</strong>{" "}
                                            {order.paymentMethod}
                                        </p>
                                        <p>
                                            <strong>Status:</strong>{" "}
                                            {order.paymentStatus}
                                        </p>
                                        <p>
                                            <strong>Total:</strong> ₹
                                            {order.totalAmount}
                                        </p>
                                        <p>
                                            <strong>Order Date:</strong>{" "}
                                            {new Date(
                                                order.orderDate
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Orders;
