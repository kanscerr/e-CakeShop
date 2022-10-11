//imports
const express = require('express');
const model = require('../schema/productSchema');
const router = express.Router();

//display all products
router.post('/products', (req, res) => {
    model.find({}, (error, result) => {
        if(result){
            res.send(result);
        }
    })
})

router.post('/sort/category', (req, res) => {
    if(req.body.category){
        model.find({'productInfo.category' : req.body.category}, (err, data) => {
            if(data){
                res.send(data);
            }
            else{
                res.json("Oops! Something went wrong");
            }
        })
    }
})

router.post('/search', (req, res) => {
    if(req.body.search){
        model.find({'productInfo.name' : req.body.search}, (err,data) =>{
            if(data){
                res.send(data);
            }
            else{
                res.json('Oops! No item found');
            }
        })
    }
})

module.exports = router;