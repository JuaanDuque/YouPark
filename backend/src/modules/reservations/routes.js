const express = require("express");
const response = require("../../network/response");
const router = express.Router();
const controller = require("./index");

router.post("/", addReservation);
router.put("/:id", updateReservation);

async function updateReservation(req, res, next) {
  try {
    const result = await controller.update(req.body.data);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function addReservation(req, res, next) {
  try {
    const items = await controller.add(req.body.data);
    response.success(req, res, items, 200);
  } catch (err) {
    next(err);
  }
}

module.exports = router;
