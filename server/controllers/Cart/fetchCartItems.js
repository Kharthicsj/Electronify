import cartModel from "../../models/Cart.js";

async function getCartItems(req, res) {
    try {
        const { userId } = req.userData;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID missing",
                error: true,
            });
        }

        // Find the cart for the user and populate product details inside items.productId
        const cart = await cartModel.findOne({ userId }).populate({
            path: "items.productId",
            select: "name sellingPrice price images quantity", // select the fields you want from product
        });

        if (!cart) {
            // Return empty cart if none found
            return res.status(200).json({
                success: true,
                message: "Cart is empty",
                cart: { items: [] },
            });
        }

        return res.status(200).json({
            success: true,
            cart,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            type: "Internal Server Error",
            error: true,
            success: false,
        });
    }
}

export default getCartItems;
