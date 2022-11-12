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

//billing information
router.post('/billing', (req, res) => {
 
    const billingInfo = {billingName : req.body.billingInfo.billingName, billingAdd : req.body.billingInfo.billingAdd, billingContact : req.body.billingInfo.billingContact,}
    const orderList = {billingInfo : billingInfo, orderInfo : req.body.orderInfo}

    if(req.body.orderInfo && req.body.userId && req.body.billingInfo.billingName && req.body.billingInfo.billingAdd && req.body.billingInfo.billingContact){

        custModel.findOneAndUpdate({userId : req.body.userId}, 
            {$push : {orderList : orderList}},
            (error, result) => {
            if(result){
                prodModel.findOneAndUpdate({productId : req.body.orderInfo.productId}, 
                    {$inc : {totalOrders : 1}},
                    (error, result) => {
                    if(result){
                        res.send(result);
                    }
                    else{
                        res.send(error);
                    }
                })
            }
            else{
                res.send(error);
            }
        }
    )
    }
    else{
        res.send("error");
    }
})

//rate order
router.post('/rate', (req, res) => {
    if(req.body.productId && req.body.rating){
        prodModel.findOne({productId : req.body.productId}, (err, data) => {
            if(data){
                // res.send(data);
                prodModel.findOneAndUpdate({productId : req.body.productId},
                    {$set : {
                        rating : Number(Math.round((req.body.rating/data.totalOrders)+"e"+1)+"e"+ -1)  //---requires total number of orders from prod collection---
                    }},
                    (error, result) => {
                        if(result){
                            res.send(result);
                        }
                        else{
                            res.send(error);
                        }
                    }    
                )
            }
            else{
                res.send("oops! something went wrong!");
            }
        })
    }
})

module.exports = router;




    