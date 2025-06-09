import productModel from "../../models/Products.js";
import uploadToCloudinary from "../../utils/uploadToCloudinary.js";

async function insertProduct(req, res) {
	try {
		const { userId, email } = req.userData;
		const { name, category, brand, description, price, sellingPrice, quantity, images } = req.body;

		if (!userId || !email) {
			return res.status(401).json({
				message: "Unauthorized access",
				error: true,
				success: false
			});
		}

		const imageUrls = [];

		for (const base64Image of images) {
			const url = await uploadToCloudinary(base64Image);
			imageUrls.push(url);
		}

		const newProduct = new productModel({
			name,
			category,
			brand,
			images: imageUrls,
			description,
			price,
			sellingPrice,
			quantity,
		});

		const result = await newProduct.save();

		return res.status(200).json({
			message: "Successfully added product",
			success: true,
			error: false,
			result,
		});

	} catch (err) {
		return res.status(500).json({
			message: err.message,
			error: true,
			success: false
		});
	}
}

export default insertProduct;
