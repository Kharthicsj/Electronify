import userModel from "../../models/User.js";

async function updateAddress(req, res) {
    const { userId } = req.userData;
    const { addressId, name, addressLine, city, state, pincode } = req.body;

    if (!addressId || !name || !addressLine || !city || !state || !pincode) {
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

        const address = user.address.id(addressId);
        if (!address) {
            return res.status(404).json({
                message: "Address not found",
                type: "Not Found",
                error: true,
                success: false
            });
        }

        address.name = name;
        address.addressLine = addressLine;
        address.city = city;
        address.state = state;
        address.pincode = pincode;

        await user.save();

        return res.status(200).json({
            message: "Address updated successfully",
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

export default updateAddress;
