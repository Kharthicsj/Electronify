import cartModel from "../../models/Cart.js";
import productModel from "../../models/Products.js";

async function addToCart(req, res) {
    try {
        const { userId, email } = req.userData;
        const { productId, quantity } = req.body;

        if (!userId || !productId || !quantity || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid input data",
                error: true,
            });
        }

        const productExists = await productModel.findById(productId);
        if (!productExists) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
                error: true,
            });
        }

        let cart = await cartModel.findOne({ userId });

        if (!cart) {
            cart = new cartModel({ userId, email, items: [] });
        }

        const index = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (index === -1) {
            cart.items.push({ productId, quantity });
        } else {
            cart.items[index].quantity += quantity;
        }

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Cart updated successfully",
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

export default addToCart;
