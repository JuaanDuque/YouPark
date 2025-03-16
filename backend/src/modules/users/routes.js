const express = require("express");
const security = require("./security");
const response = require("../../network/response");
const router = express.Router();
const controller = require("./index");

router.get("/", allItems);
router.get("/email/:email", oneItemEmail);
router.get("/:id", oneItem);
router.put("/", security(), deleteItem);
router.post("/", security(), addItem);

async function allItems(req, res) {
  try {
    const items = await controller.selectAll();
    response.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function oneItem(req, res, next) {
  try {
    const items = await controller.selectOne(req.params.id);
    response.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function oneItemEmail(req, res, next) {
  try {
    const items = await controller.selectOneEmail(req.params.email);
    response.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function addItem(req, res, next) {
  try {
    await controller.add(req.body.data.newUser);
    if (req.body.data.newUser.id == 0) {
      message = "item guardado con exito";
    } else {
      message = "item actualizado con exito";
    }
    response.success(req, res, message, 201);
  } catch (err) {
    next(err);
  }
}

async function deleteItem(req, res, next) {
  try {
    await controller.remove(req.body);
    response.success(req, res, "item eliminado satisfactoriamente", 200);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
