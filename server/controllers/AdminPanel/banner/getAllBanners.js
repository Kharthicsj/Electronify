import bannerModel from "../../../models/Banner.js";

async function getAllBanners(req, res) {
    try {
        const result = await bannerModel.find();

        if (!result) {
            return res.status(200).json({
                message: "No Banner Images Found",
                error: false,
                success: false,
                result: [],
            })
        }

        return res.status(200).json({
            message: "Banner's fetched Successfully",
            error: false,
            success: true,
            result: result
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: true,
            success: false
        });
    }
}

export default getAllBanners;