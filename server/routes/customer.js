//imports
const express = require('express');
const model = require('../schema/customerSchema');
const router = express.Router();

//register
router.post('/register', (req,res) => {
    if(req.body.firstName && req.body.lastName && req.body.email && req.body.password){
        model.findOne({'userInfo.email' : req.body.email}, (err, data) =>{
            if(data){
                res.json("Email already registered!");
            }
            else{
                model.findOne().sort({userId : -1}).limit(1).exec((error, result) =>{
                    if(result){
                        const customerDetail = new model({
                            'userInfo.firstName' : req.body.firstName,
                            'userInfo.lastName' : req.body.lastName,
                            'userInfo.email' : req.body.email,
                            'userInfo.password' : req.body.password,
                            userId : result.userId+1
                        })
                        customerDetail.save();
                        res.send(customerDetail);
                    }
                    else{
                        const customerDetail = new model({
                            'userInfo.firstName' : req.body.firstName,
                            'userInfo.lastName' : req.body.lastName,
                            'userInfo.email' : req.body.email,
                            'userInfo.password' : req.body.password,
                            userId : 100
                        })
                        customerDetail.save();
                        res.send(customerDetail);
                    }
                })
            }
        })
    }
    else{
        res.json("Fill all fields!");
    }
})

//login
router.post('/login', (req, res) => {
    if(req.body.email && req.body.password){
        model.findOne({userId : req.body.userId}, (error, result) => {
            if(result){
                if(req.body.email === result.userInfo.email && req.body.password === result.userInfo.password){
                    res.send(result);
                }
                else{
                    res.json("Invalid login credentials");
                }
            }
            else{
                res.json("User does not exist!");
            }
        })
    }
    else{
        res.json("Fill all fields");
    }
})

module.exports = router;