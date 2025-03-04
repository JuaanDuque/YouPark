const express = require('express');
const response = require('../../network/response');
const router = express.Router();
const controller = require('./controller');

router.get('/',function(req,res){
    const todos = controller.selectAll().then((items)=>{
        response.success(req,res,items,200);
    })
})

module.exports = router;