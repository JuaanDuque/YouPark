const express = require('express');
const response = require('../../network/response');
const router = express.Router();
const controller = require('./controller');

router.get('/', allItems);
router.get('/:id',oneItem);
router.put('/', deleteItem);
router.post('/',addItem);

async function allItems (req,res){
    try{
        const items = await controller.selectAll();
        response.success(req,res,items,200);
    }catch(err){
        next(err);
    }
}

async function oneItem (req,res){
    try{
        const items = await controller.selectOne(req.params.id);
        response.success(req,res,items,200);
    }catch(err){
        next(err);
    }
}

async function addItem (req,res,next){
    try{
        await controller.remove(req.body);
        if(req.body.id == 0){
            message = 'item guardado con exito';
        }else{
            message = 'item actualizado con exito'
        }
        response.success(req,res,message,201);
    }catch(err){
        next(err);
    }
}

async function deleteItem (req,res,next){
    try{
        await controller.remove(req.body);
        response.success(req,res,'item eliminado satisfactoriamente',200);
    }catch(err){
        next(err);
    }
}

module.exports = router;