const express = require("express");
const router = express.Router();

const {
  createRegion,
  find,
  findRegion,
  updateRegion,
  deleteRegion,
} = require("../Controllers/region_controller");

router.post("/createRegion", (req, res) => {
  createRegion(req, res);
});

router.get("/find", (req, res) => {
  find(req, res);
});

router.get("/findRegion/:id", (req, res) => {
  findRegion(req, res);
});

router.put("/updateRegion/:id", (req, res) => {
  updateRegion(req, res);
});

router.delete("/deleteRegion/:id", (req, res) => {
  deleteRegion(req, res);
});

module.exports = router;
