import userModel from "../../models/User.js";
import bcrypt from "bcryptjs"

async function Signup(req, res) {
    try {
        const { username, email, role, password } = req.body;

        const isExistingUser = await userModel.findOne({ email: email });
        if (isExistingUser) {
            return res.status(409).json({
                message: "User Already Exists",
                type: "Duplicate Values",
                error: true,
                success: false,
            })
        } else {
            const hashedPassword = await bcrypt.hash(password, 12)
            const newUser = new userModel({
                username,
                role,
                email,
                password: hashedPassword,
            })

            const result = await newUser.save();
            return res.status(200).json({
                message: "User Account Created Successfully",
                type: "Success message",
                error: false,
                success: true,
                data: result
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err,
            type: "Internal Server Error",
            error: true,
            success: false,
        })
    }
}

export default Signup