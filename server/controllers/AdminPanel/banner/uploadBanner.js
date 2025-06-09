import bannerModel from "../../../models/Banner.js";
import uploadToCloudinary from "../../../utils/uploadToCloudinary.js";

async function uploadBanner(req, res) {
    try {
        const { userId, email } = req.userData;
        const { name, image, device } = req.body;

        if (!userId || !email) {
            return res.status(401).json({
                message: "Unauthorized access",
                error: true,
                success: false
            });
        }

        const url = await uploadToCloudinary(image);

        const newBanner = new bannerModel({
            name,
            image: url,
            device
        });

        const result = await newBanner.save();

        return res.status(200).json({
            message: "Successfully Uploaded Banner",
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

export default uploadBanner