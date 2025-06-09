import productModel from "../../models/Products.js";

async function getSearchedProducts(req, res) {
    try {
        const query = req.query.q;

        if (!query || query.trim() === "") {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Search query is required",
            });
        }

        const regex = new RegExp(query, "i"); // case-insensitive

        const products = await productModel.find({
            $or: [
                { name: regex },
                { category: regex },
                { brand: regex },
                { description: regex },
            ],
        });

        return res.status(200).json({
            success: true,
            error: false,
            message: "Products fetched successfully",
            products,
        });
    } catch (err) {
        console.error("Search error:", err);
        return res.status(500).json({
            success: false,
            error: true,
            message:
                "An unexpected error occurred while searching for products",
        });
    }
}

export default getSearchedProducts;
