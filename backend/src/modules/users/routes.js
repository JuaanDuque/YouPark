const express = require("express");
const security = require("./security");
const response = require("../../network/response");
const router = express.Router();
const controller = require("./index");

router.get("/", allItems);
router.get("/email/:email", oneItemEmail);
router.get("/getUsers", getUsers);
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

async function getUsers(req, res, next) {
  try {
    const { role_id } = req.query;

    if (!role_id) {
      return response.error(req, res, "role_id es obligatorio", 400);
    }

    // Construir la consulta SQL dinámica
    const query = `
      SELECT 
        u.id, 
        u.full_name, 
        u.identification_number, 
        u.email, 
        u.phone, 
        u.apartment_number, 
        u.tower, 
        u.active, 
        u.vehicle1_id, 
        u.vehicle2_id, 
        u.role_id, 
        v1.vehicle_type_id AS vehicle1Type, 
        v2.vehicle_type_id AS vehicle2Type
      FROM 
        users u
      LEFT JOIN 
        vehicles v1 ON u.vehicle1_id = v1.plate
      LEFT JOIN 
        vehicles v2 ON u.vehicle2_id = v2.plate
      WHERE 
        u.role_id = ?;
    `;

    const items = await controller.getUsers(query, [role_id]);
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
