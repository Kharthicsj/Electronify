import orderModel from "../../models/Orders.js";

async function getOrder(req, res) {
    try {
        const { userId } = req.userData;

        const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            error: false,
            message: "User orders fetched successfully",
            orders,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "An unexpected error occurred while fetching the orders",
        });
    }
}

export default getOrder;
