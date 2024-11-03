const path =require('path')

const rootDir=require('../util/path')

exports.getProduct=(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','add-product.html'))
    //next() // allow the request to continue to the next middleware in line 
    }
exports.postProduct=(req,res,next)=>{
    // console.log('In the another middleware');
    console.log(req.body);
     res.redirect('/shop');
 }