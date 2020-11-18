const express = require("express");
const router = express.Router();

const {
  createCity,
  find,
  findCityById,
  updateCityById,
  deleteCityById,
} = require("../Controllers/city_controller");

router.post("/createCity", (req, res) => {
  createCity(req, res);
});

router.get("/find", (req, res) => {
  find(req, res);
});

router.get("/findCity/:id", (req, res) => {
  findCityById(req, res);
});

router.put("/updateCity/:id", (req, res) => {
  updateCityById(req, res);
});

router.delete("/deleteCity/:id", (req, res) => {
  deleteCityById(req, res);
});

module.exports = router;
