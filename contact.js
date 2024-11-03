const express=require('express')

const path=require('path')

const rootDir=require('../util/path')

const contactController= require('../controller/contactus')

const router=express()

router.get('/contact-us',contactController.getContact)
router.post('/contact-us',contactController.postContact)
module.exports=router