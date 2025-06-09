import cartModel from "../../models/Cart.js";

async function deleteCartItem(req, res) {
    const { userId } = req.userData;
    const { productId } = req.body;

    try {
        const result = await cartModel.updateOne(
            { userId },
            { $pull: { items: { productId } } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({
                message: "Cart item not found",
                success: false,
                error: true,
            });
        }

        res.status(200).json({
            message: "Cart item deleted successfully",
            success: true,
            error: false,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Something went wrong",
            success: false,
            error: true,
        });
    }
}

export default deleteCartItem;
