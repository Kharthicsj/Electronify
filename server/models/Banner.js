import mongoose from "mongoose"

const bannerSchema = new mongoose.Schema({
    name: String,
    image: String,
    device: String,
}, {
    timestamps: true
})

const bannerModel = mongoose.model("Banner", bannerSchema);

export default bannerModel