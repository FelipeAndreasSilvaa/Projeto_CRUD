import mongoose, { Schema } from "mongoose";

const ProductModel = mongoose.models.Product || mongoose.model("Product", new Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: String, required: true},

},{
    timestamps: true,
}))

export default ProductModel