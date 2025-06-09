import productModel from "../../models/Products.js";

async function fetchPublicProducts(req, res) {
    try {

        const products = await productModel.find()

        return res.status(200).json({
            message: "Products Fetched Successfully",
            products: products,
            error: false,
            success: true
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: true,
            success: false
        });
    }
}

export default fetchPublicProducts