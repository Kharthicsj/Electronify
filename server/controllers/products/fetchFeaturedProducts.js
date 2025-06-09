import productModel from "../../models/Products.js";

async function fetchFeaturedProducts(req, res) {
    try {
        const products = await productModel.aggregate([
            { $sample: { size: 20 } }
        ]);
        
        return res.status(200).json({
            message: "Random Products Fetched Successfully",
            products: products,
            error: false,
            success: true
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: true,
            success: false
        });
    }
}

export default fetchFeaturedProducts;
