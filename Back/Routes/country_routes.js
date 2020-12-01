const express = require("express");
const router = express.Router();

const {
  createCountry,
  find,
  findCountry,
  updateCountry,
  deleteCountry,
  findRegionCountry,
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

router.get("/find/region/:regionId", (req, res) => {
  let { regionId } = req.params;
    findRegionCountry(regionId)
      .then((Country) => {
        res.status(200).json(Country);
      })
      .catch((err) => {
        res.status(500).json("Error interno, por favor intente mas tarde");
      });
});

router.put("/updateCountry/:id", (req, res) => {
  updateCountry(req, res);
});

router.delete("/deleteCountry/:id", (req, res) => {
  deleteCountry(req, res);
});

module.exports = router;
