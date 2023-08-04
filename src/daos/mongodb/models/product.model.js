import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    price: { type: Number, required: true },
    category: { type: String, required: true, max: 100 },
    code: { type: String, required: true, max: 100, unique: true },
    stock: { type: Number, required: true },
    thumbnails: { type: Array, required: true },
    status: { type: Boolean, required: true },
})

productSchema.plugin( mongoosePaginate );
export const productModel = mongoose.model('products', productSchema)