//---ROUTE FOR UPLOADING PRODUCT INFO IN DB---

//imports
const express = require('express');
const model = require('../schema/productSchema');
let router = express.Router();



//add data
router.post("/infoUpload", (req, res)=>{
    if(req.body.name && req.body.category && req.body.price){
        model.findOne({'productInfo.name' : req.body.name}, (err, result)=> {
            if(result){
                res.json("Product already exists!");
            }
            else{
                model.findOne().sort({productId : -1}).limit(1).exec((err, data)=> {
                    if(data){
                        const prodInfo = new model ({
                            'productInfo.name' : req.body.name,
                            'productInfo.category' : req.body.category,
                            'productInfo.price' : req.body.price,
                            'totalOrders' : 0,
                            'rating' : 0,
                            productId : data.productId+1
                        });
                        prodInfo.save();
                        res.send(prodInfo);
                    }
                    else{
                        const prodInfo = new model ({
                            'productInfo.name' : req.body.name,
                            'productInfo.category' : req.body.category,
                            'productInfo.price' : req.body.price,
                            'totalOrders' : 0,
                            'rating' : 0,
                            productId : 100
                        });
                        prodInfo.save();
                        res.send(prodInfo);
                    }
                })
            }
        })   
    }
    else{
        res.send(req.body);
    }
})


//edit data
router.post("/infoUpdate", (req, res)=>{
    model.find({productId : req.body.productId}, (reject, data) => {
        if(data){{
            model.findOneAndUpdate({productId : req.body.productId},
            {$set: {'productInfo.price' : req.body.price}}, (error, result) =>{
                if(result){
                    model.find({productId : req.body.productId}, (err, sol) => {
                        if(sol){
                            res.send(sol);
                        }
                        else{
                            res.json("no data");
                        }
                    })
                }
            })
        }}
        else{
            res.send('error');
        }
    })
})


module.exports = router;