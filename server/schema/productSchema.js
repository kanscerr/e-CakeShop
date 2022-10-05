//---PRODUCT SCHEMA---

//imports
const mongoose = require('mongoose');

//schema
const prodSchema = new mongoose.Schema({
    productInfo : {
        name : String,
        category : String,
        price : Number
        },
    productId : Number,
    totalOrders : Number,
    rating : Number
})

//creating model
const model = mongoose.model('productlist', prodSchema);

//export model
module.exports = model;