import orderModel from "../../models/Orders.js";

async function getAllOrders(req, res) {
    const { userId, email } = req.userData;
    try {

        if (!userId || !email) {
            return res.status(401).json({
                message: "Unauthorized access",
                error: true,
                success: false,
            });
        }

        const orders = await orderModel.find();
        return res.status(200).json({
            message: "Succesfully fetched products",
            orders,
            error: false,
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: true,
            message: "An unexpected error occurred while fetching the orders",
        });
    }
}

export default getAllOrders