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
    billingAdd : String
})

const orderInfo = new mongoose.Schema({
    productName : String,
    quantity : Number,
    totalPrice : Number,
    rating : Number
})

const customerSchema = new mongoose.Schema({
    userId : Number,
    userInfo : userInfo,
    orderList : [{
        billingInfo : billingInfo,
        orderInfo : orderInfo,
    }]
})

//creating model
const model = mongoose.model('customerlist', customerSchema);

//exporting
module.exports = model; 