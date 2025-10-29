import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    company: { type: String, required: true },
    color: { type: String, required: true },
    category: { type: String, required: true },
});

const Product = models.Product || model('products', productSchema);

export default Product;