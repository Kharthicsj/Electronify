import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    brand: String,
    images: [],
    description: String,
    price: Number,
    sellingPrice: Number,
    quantity: Number,
}, {
    timestamps: true
})

const productModel = mongoose.model("Product", productSchema)
export default productModel