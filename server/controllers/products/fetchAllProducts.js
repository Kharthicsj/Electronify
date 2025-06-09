import productModel from "../../models/Products.js";

async function fetchAllProducts(req, res) {
    try {
        const { userId, email } = req.userData;

        if (!userId || !email) {
            return res.status(401).json({
                message: "Unauthorized access",
                error: true,
                success: false
            });
        }

        const products = await productModel.find()

        if (!products) {
            return res.status(200).json({
                message: "No Products Found",
                error: false,
                success: false
            })
        }

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

export default fetchAllProducts