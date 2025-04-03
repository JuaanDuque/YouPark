const express = require("express");
const response = require("../../network/response");
const router = express.Router();
const controller = require("./index");

router.get("/", allItemsVehicle);
router.post("/", addParkingslot);
router.get("/vehicle", allItemsVehicleType);
router.put("/:id", updateParkingSlot);

async function allItemsVehicle(req, res, next) {
  try {
    const items = await controller.selectAllVehicle(req.query);
    response.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function addParkingslot(req, res, next) {
  try {
    const items = await controller.add(req.body.data);
    response.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function allItemsVehicleType(req, res, next) {
  try {
    const items = await controller.selectAllVehicleType(req.query);
    response.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

async function updateParkingSlot(req, res, next) {
  try {
    const result = await controller.update(req.body.data);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
