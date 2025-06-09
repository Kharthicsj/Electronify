import productModel from "../../models/Products.js";

async function getSingleProduct(req, res) {
    const { productId } = req.query
    try {
        const productData = await productModel.findOne({ _id: productId });

        return res.status(200).json({
            message: "Product Fetched Successfully",
            productData: productData,
            error: false,
            succes: true
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: true,
            success: false
        });
    }
}

export default getSingleProduct