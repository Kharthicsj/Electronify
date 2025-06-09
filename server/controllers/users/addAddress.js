import userModel from "../../models/User.js";

async function addAddress(req, res) {
    const { userId } = req.userData;
    const { name, addressLine, city, state, pincode } = req.body;

    if (!name || !addressLine || !city || !state || !pincode) {
        return res.status(400).json({
            message: "All address fields are required",
            type: "Validation Error",
            error: true,
            success: false
        });
    }

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                type: "Not Found",
                error: true,
                success: false
            });
        }

        user.address.push({ name, addressLine, city, state, pincode });
        await user.save();

        return res.status(200).json({
            message: "Address added successfully",
            type: "Success Message",
            data: user.address,
            error: false,
            success: true
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            type: "Internal Server Error",
            error: true,
            success: false
        });
    }
}

export default addAddress;
