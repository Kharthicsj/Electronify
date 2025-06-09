import userModel from "../../../models/User.js";

async function updateUserRole(req, res) {
    try {
        const { userId, email } = req.userData;
        const { targetUserId, role } = req.body;

        if (!userId || !email) {
            return res.status(401).json({
                message: "Unauthorized access",
                error: true,
                success: false,
            });
        }

        // Only allow "admin" or "user" roles
        if (!["admin", "user"].includes(role)) {
            return res.status(400).json({
                message: "Invalid role provided",
                error: true,
                success: false,
            });
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            targetUserId,
            { role },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }

        return res.status(200).json({
            message: "User role updated successfully",
            success: true,
            error: false,
            updatedUser,
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false,
        });
    }
}

export default updateUserRole;
