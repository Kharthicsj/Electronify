import productModel from "../../models/Products.js";
import { v2 as cloudinary } from "cloudinary";

async function deleteProduct(req, res) {
    try {
        const { userId, email } = req.userData;
        const { productId } = req.query;

        if (!userId || !email) {
            return res.status(401).json({
                message: "Unauthorized access",
                error: true,
                success: false
            });
        }

        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({
                error: true,
                success: false,
                message: "Product not found"
            });
        }

        // Delete images from Cloudinary
        if (Array.isArray(product.images)) {
            for (const imageUrl of product.images) {
                const parts = imageUrl.split("/");
                const filename = parts[parts.length - 1].split(".")[0];
                const publicId = `ecommerce-products/${filename}`;

                await cloudinary.uploader.destroy(publicId);
            }
        }

        // Delete product from MongoDB
        await productModel.findByIdAndDelete(productId);

        return res.status(200).json({
            message: "Product deleted successfully",
            error: false,
            success: true
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: err.message,
            error: true,
            success: false
        });
    }
}

export default deleteProduct;
