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

module.exports = router;