import bannerModel from "../../../models/Banner.js";
import { v2 as cloudinary } from "cloudinary";

async function deleteBanner(req, res) {
	try {
		const { userId, email } = req.userData;
		const { bannerId, imageUrl } = req.body;

		if (!userId || !email) {
			return res.status(401).json({
				message: "Unauthorized access",
				error: true,
				success: false,
			});
		}

		// Extract public_id from image URL
		const parts = imageUrl.split("/");
		const filename = parts[parts.length - 1]; // e.g., abc123.jpg
		const publicId = `ecommerce-products/${filename.split(".")[0]}`; // remove .jpg

		// Delete from Cloudinary
		await cloudinary.uploader.destroy(publicId);

		// Delete from DB
		await bannerModel.findByIdAndDelete(bannerId);

		return res.status(200).json({
			message: "Banner deleted successfully",
			success: true,
			error: false,
		});
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			message: err.message,
			success: false,
			error: true,
		});
	}
}

export default deleteBanner;
