let express = require("express");
let bodyparser = require("body-parser");
let Productcategory = require("../models/Productcategory");
let fs = require("fs");

let router = express.Router();

router.post("/save", async(req,res)=>{
    try{
        let body = req.body;
        let productcategory = new Productcategory();
        if(body.data.id != ""){
            productcategory = await Productcategory.findById(body.data.id);
        }
        productcategory.name = body.data.name;
        productcategory.srno = body.data.srno;
        let base641image = body.data.image;
        if(base641image != ""){
            let randomname = (Math.random() + 1).toString(36).substring(7);
            base641image = base641image.replace(/^data:image\*;base64,/,"");
            productcategory.imagepath = "productcategories/" + randomname + ".png";
            fs.writeFile("assets/" + productcategory.imagepath, base641image, 'base64', function(err){
                if(err)
                    console.log("Error while saving image " + err);
            });
        }
        productcategory.save().then(result=>{
            res.end(JSON.stringify({status:"sucess", data:result}));
        }, err=>{
            res.end(JSON.stringify({status:"failed", data:result}));
        });
    }
    catch{
        res.end(JSON.stringify({status:"failed", data:"Somthing went wrong"}));
    }
});
    
router.post("/list", async(req, res)=>{
    try{
        let productcategories = await Productcategory.find();
        res.end(JSON.stringify({status:"success", data:productcategories}));
    }
    catch{
        res.end(JSON.stringify({status:"failed", data:"Somthing went wrong"}));
    }
});

router.post("/get", async(req, res)=>{
    try{
        let body = req.body;
        let productcategory = await Productcategory.findById(body.data.id);
        res.end(JSON.stringify({status:"success", data:productcategory}));
    }
    catch{
        res.end(JSON.stringify({status:"failed", data:"Somthing went wrong"}));
    }
});

router.post("/delete", async(req, res)=>{
    try{
        let body = req.body;
        await Productcategory.findByIdAndDelete(body.data.id);
        res.end(JSON.stringify({status:"success"}));
    }
    catch{
        res.end(JSON.stringify({status:"failed", data:"Somthing went wrong"}));
    }
});

module.exports = router;