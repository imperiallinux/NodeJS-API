let express = require("express");
let bodyparser = require("body-parser");
let User = require("../models/User");
let Order = require("../models/Order");

let router = express.Router();

router.post("/register", async(req,res)=>{
    try{
        let body = req.body;
        let user = new User();

        let users = await User.find({email:body.data.email});
        if(users.length != 0){
            res.end(JSON.stringify({status:"failed", data:"Email in use"}));
        }
        users = await User.find({mobileno:body.data.mobileno});
        if(users.length != 0){
            res.end(JSON.stringify({status:"failed", data:"Phone in use"}));
        }

        user.name = body.data.name;
        user.email = body.data.email;
        user.mobileno = body.data.mobileno;
        user.password = body.data.password;
        user.save().then(result=>{
            res.end(JSON.stringify({status:"success", data:result}));
        },err=>{
            res.end(JSON.stringify({status:"failed", data:err}));
        });
    }
    catch{
        res.end(JSON.stringify({status:"failed", data:"Somthing went wrong"}));
    }
});

router.post("/login", async(req,res)=>{
    try{
        let body = req.body;
        let user = await User.findOne({email:body.data.email});
        if(user == null){
            res.end(JSON.stringify({status:"failed", data:"Email does not exist"}));
        }
        else{
            if(user.password == body.data.password){
                res.end(JSON.stringify({status:"success", data:user}));
            }
            else{
                res.end(JSON.stringify({status:"failed", data:"Wrong Password"}));
            }
        }
    }
    catch{
        res.end(JSON.stringify({status:"failed", data:"Somthing went wrong"}));
    }
});

router.post("/orders", async(req,res)=>{
    try{
        let body = req.body;
        let order = await Order.find({userid:body.data.userid});
        res.end(JSON.stringify({status:"success", data:orders})); 
    }
    catch{
        res.end(JSON.stringify({status:"failed", data:"Something went wrong"})); 
    }
});

module.exports = router;