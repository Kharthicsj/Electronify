import userModel from "../../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

async function Signin(req, res) {
    try {
        const { email, password } = req.body;
        const isExistingUser = await userModel.findOne({ email: email });
        
        if (!isExistingUser) {
            return res.status(200).json({
                message: "User account does not exist",
                type: "Account Error",
                error: true,
                success: false
            })
        } else {
            const validatePassword = await bcrypt.compare(password, isExistingUser.password);
            if (!validatePassword) {
                return res.status(200).json({
                    message: "Incorrect password",
                    type: "Validation Error",
                    error: true,
                    success: false
                })
            } else {
                const token = jwt.sign({
                    userId: isExistingUser._id,
                    email: isExistingUser.email
                }, "mysecretcode", {
                    expiresIn: '1h'
                })

                return res.status(200).json({
                    message: "Login Successful",
                    token: token,
                    type: "Login Success Message",
                    error: false,
                    success: true,
                })
            }
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

export default Signin