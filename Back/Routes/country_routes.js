const express = require("express");
const router = express.Router();

const {
  createCountry,
  find,
  findCountry,
  updateCountry,
  deleteCountry,
} = require("../Controllers/country_controller");

router.post("/create", (req, res) => {
  createCountry(req, res);
});

router.get("/find", (req, res) => {
  find(req, res);
});

router.get("/findCountry/:id", (req, res) => {
  findCountry(req, res);
});

//TODO: ME FALTA VERIFICAR ESTE, ME ESTA GENERANDO ERROR
router.put("/updateCountry/:id", (req, res) => {
  updateCountry(req, res);
});

router.delete("/deleteCountry/:id", (req, res) => {
  deleteCountry(req, res);
});

module.exports = router;
