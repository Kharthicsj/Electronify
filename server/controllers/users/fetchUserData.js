import userModel from "../../models/User.js";

async function fetchUserData(req, res) {
    const { userId, email } = req.userData;
    try {
        if (!userId || !email) {
            return res.status(404).json({
                message: "Unauthorized access",
                type: "Invalid data",
                error: true,
                success: false
            })
        }

        const result = await userModel.findOne({ _id: userId, email: email });
        return res.status(200).json({
            message: "UserData fetched Successfully",
            type: "Success Message",
            data: result,
            error: false,
            success: true
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

export default fetchUserData