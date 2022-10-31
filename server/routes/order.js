//imports
const express = require('express');
const prodModel = require('../schema/productSchema');
const custModel = require('../schema/customerSchema');
const router = express.Router();

//place order
router.post('/orderInfo', (req, res) => {
    let orderInfo = new Object;
    if(req.body.productId && req.body.quantity && req.body.userId){
        prodModel.findOne({productId : req.body.productId}, (err, data) => {
            if(data){
                orderInfo.userId = req.body.userId;
                orderInfo.productId = req.body.productId;
                orderInfo.quantity = req.body.quantity;
                orderInfo.totalPrice = req.body.quantity*data.productInfo.price;
                res.send(orderInfo);
            }
            else{
                res.json("oops! something went wrong");
            }
        })
    }
    else{
        res.json("not enough information");
    }
})


router.post('/billing', (req, res) => {
    if(req.body.orderInfo && req.body.userId && req.body.billingName && req.body.billingAdd && req.body.billingContact){
        //objects to be pushed
        const billingInfo = {billingName : req.body.billingName, billingAdd : req.body.billingAdd, billingContact : req.body.billingContact,}
        const orderList = {billingInfo : billingInfo, orderInfo : req.body.orderInfo}
        custModel.findOneAndUpdate({userId : req.body.userId}, 
            {$push : 
                {orderList : orderList}
            }, 
            (error, result) => {
            if(result){
                res.send(result);
            }
            else{
                res.send(error);
            }
        })
    }
})

module.exports = router;