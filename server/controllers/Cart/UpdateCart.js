import cartModel from "../../models/Cart.js";

async function updateCart(req, res) {
    try {
        const { userId } = req.userData;
        const { productId, quantity } = req.body;

        if (!productId || typeof quantity !== "number" || quantity < 1) {
            return res.status(400).json({
                message: "Invalid product ID or quantity",
                error: true,
                success: false,
            });
        }

        const cart = await cartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
                error: true,
                success: false,
            });
        }

        const itemIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (itemIndex === -1) {
            return res.status(404).json({
                message: "Product not found in cart",
                error: true,
                success: false,
            });
        }

        cart.items[itemIndex].quantity = quantity;
        await cart.save();

        return res.status(200).json({
            message: "Cart updated successfully",
            data: cart,
            error: false,
            success: true,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success: false,
        });
    }
}

export default updateCart;
