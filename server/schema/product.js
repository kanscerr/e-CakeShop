//---PRODUCT SCHEMA---

//imports
const mongoose = require('mongoose');

//schema
const productInfo = new mongoose.Schema({
    name : String,
    category : String,
    price : Number
})

const prodSchema = new mongoose.Schema({
    name : String,
    category : Number,
    price : Number,
    productId : Number,
    totalOrders : Number,
    rating : Number
})

//creating model
const model = mongoose.model('productlist', prodSchema);

//export model
module.exports = model;