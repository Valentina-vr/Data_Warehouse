const express = require("express");
const router = express.Router();

const {
  createCity,
  find,
  findCityById,
  updateCityById,
  deleteCityById,
  findCityCountry,
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

router.get("/find/country/:countryId", (req, res) => {
  let { countryId } = req.params;
    findCityCountry(countryId)
      .then((City) => {
        res.status(200).json(City);
      })
      .catch((err) => {
        res.status(500).json("Error interno, por favor intente mas tarde");
      });
});

module.exports = router;
