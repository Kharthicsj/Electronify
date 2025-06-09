import productModel from "../../models/Products.js";

async function updateProduct(req, res) {
    try {
        const { userId, email } = req.userData;
        const {
            _id,
            name,
            category,
            brand,
            description,
            price,
            sellingPrice,
            quantity,
            images,
        } = req.body;

        if (!userId || !email) {
            return res.status(401).json({
                message: "Unauthorized access",
                error: true,
                success: false,
            });
        }

        if (!_id) {
            return res.status(400).json({
                message: "Product ID is required",
                error: true,
                success: false,
            });
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            _id,
            {
                name,
                category,
                brand,
                description,
                price,
                sellingPrice,
                quantity,
                images, // not editable via modal, but still sent back, so safe to store
            },
            { new: true } // returns updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false,
            });
        }

        return res.status(200).json({
            message: "Product updated successfully",
            success: true,
            error: false,
            product: updatedProduct,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: err.message,
            error: true,
            success: false,
        });
    }
}

export default updateProduct;
