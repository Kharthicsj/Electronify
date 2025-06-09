import userModel from "../../models/User.js";

async function deleteAddress(req, res) {
    const { userId } = req.userData;
    const { addressId } = req.query;

    if (!addressId) {
        return res.status(400).json({
            message: "Address ID is required",
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

        const addressIndex = user.address.findIndex(
            (addr) => addr._id.toString() === addressId
        );

        if (addressIndex === -1) {
            return res.status(404).json({
                message: "Address not found",
                type: "Not Found",
                error: true,
                success: false,
            });
        }

        user.address.splice(addressIndex, 1);
        await user.save();


        return res.status(200).json({
            message: "Address deleted successfully",
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

export default deleteAddress;
