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

const authorization = require("../Middlewares/authorization");
const authentication = require("../Middlewares/authentication");
const CheckDuplicateEmail = require("../Middlewares/verify");

router.post("/create", authentication, (req, res) => {
  createCountry(req, res);
});

router.get("/find", authentication, (req, res) => {
  find(req, res);
});

router.get("/findCountry/:id", authentication, (req, res) => {
  findCountry(req, res);
});

router.get("/find/region/:regionId", authentication, (req, res) => {
  let { regionId } = req.params;
    findRegionCountry(regionId)
      .then((Country) => {
        res.status(200).json(Country);
      })
      .catch((err) => {
        res.status(500).json("Error interno, por favor intente mas tarde");
      });
});

router.put("/updateCountry/:id", authentication, (req, res) => {
  updateCountry(req, res);
});

router.delete("/deleteCountry/:id",authentication, (req, res) => {
  deleteCountry(req, res);
});

module.exports = router;
