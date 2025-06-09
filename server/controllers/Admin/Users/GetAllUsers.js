import userModel from "../../../models/User.js";

async function fetchAllUsers(req, res) {
    try {
        const { userId, email } = req.userData;
        if (!userId || !email) {
            return res.status(401).json({
                message: "Unauthorized access",
                error: true,
                success: false,
            });
        }

        const result = await userModel.find();

        return res.status(200).json({
            message: "All User's data have been fetched successfully",
            result: result,
            error: false,
            success: true,
        })

    } catch (err) {
        return res.status(500).json({
            message: err,
            type: "Internal Server Error",
            error: true,
            success: false,
        })
    }
}

export default fetchAllUsers