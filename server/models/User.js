import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    name: String,
    addressLine: String,
    city: String,
    state: String,
    pincode: Number
})

const userSchema = new mongoose.Schema({
    username: String,
    role: String,
    email: String,
    password: String,
    address: [addressSchema]
}, {
    timestamps: true,
})

const userModel = mongoose.model("User", userSchema)
export default userModel