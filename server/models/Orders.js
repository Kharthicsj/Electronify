import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
    userId: String,
    cartItems: [
        {
            productId: String,
            title: String,
            image: String,
            price: String,
            quantity: Number,
        },
    ],
    addressInfo: {
        addressId: String,
        name: String,
        addressLine: String,
        city: String,
        state:String,
        pincode: String,
    },
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: Number,
    orderDate: Date,
    orderUpdateDate: Date,
    paymentId: String,
    payerId: String,
});

const orderModel = mongoose.model("Order", OrderSchema);
export default orderModel