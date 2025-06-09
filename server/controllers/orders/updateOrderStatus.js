import orderModel from "../../models/Orders.js"; // ensure .js if using ES modules

async function updateOrderStatus(req, res) {
    try {
        const { id } = req.params;
        const { orderStatus } = req.body;

        if (!id || !orderStatus) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Order ID and new status are required",
            });
        }

        const updatedOrder = await orderModel.findByIdAndUpdate(
            id,
            { orderStatus, orderUpdateDate: new Date() },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Order not found",
            });
        }

        return res.status(200).json({
            success: true,
            error: false,
            message: "Order status updated successfully",
            order: updatedOrder,
        });
    } catch (err) {
        console.error("Update error:", err);
        return res.status(500).json({
            success: false,
            error: true,
            message: "An unexpected error occurred while updating the order status",
        });
    }
}

export default updateOrderStatus;
