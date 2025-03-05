const mongoose = require ('mongoose');

//Creating Schema
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Creates createdAt, updatedAt fields
});

//Creating Model
const Product = mongoose.model('Product', productSchema)

//Exporting Model
module.exports = Product;