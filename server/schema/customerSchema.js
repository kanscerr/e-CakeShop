//---CUSTOMER SCHEMA---

//imports
const mongoose = require('mongoose');

//schema
const userInfo = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email : String,
    password : String
})

const billingInfo = new mongoose.Schema({
    billingName : String,
    billingContact : Number,
    billingAdd : String
})

const orderInfo = new mongoose.Schema({
    productId : Number,
    quantity : Number,
    totalPrice : Number,
    rating : Number
})

const orderList = new mongoose.Schema({
    orderInfo : orderInfo,
    billingInfo : billingInfo 
})

const customerSchema = new mongoose.Schema({
    userId : Number,
    userInfo : userInfo,
    orderList : [orderList]
})

//creating model
const model = mongoose.model('customerlist', customerSchema);

//exporting
module.exports = model; 