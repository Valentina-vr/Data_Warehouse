const Country = require("../Database/Models/country_model");

const createCountry = async (req, res) => {
  const { name } = req.body;
  const newCountry = new Country({
    name,
  });
  const savedCountry = await newCountry.save();
  res.status(200).json(savedCountry);
};

const find = (req, res) => {
  Country.findAll()
    .then((country) => {
      res.status(200).json(country);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Oh oh, the server has presented an error, try again later x_x",
      });
    });
};

const findCountry = (req, res) => {
  let id = req.params.id;
  Country.findOne({ where: { id: id } }).then((country) => {
    res.status(200).json(country);
  });
};

const updateCountry = (req, res) => {
  let id = req.params.id;
  let data = req.body;

  console.log(data);
  Country.update(data, { where: { id: id } })
    .then((country) => {
      if (country[0] === 1)
        res.status(200).json({ message: " The country has been updated successfully" });
      else res.status(400).json({ message: "Country could not be updated" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Oh oh, the server has presented an error, try again later x_x",
      });
    });
};

const deleteCountry = (req, res) => {
  let id = req.params.id;
  Country.destroy({ where: { id: id } })
    .then((country) => {
      if (country === 1)
        res.status(200).json({ message: "Country has been successfully delete" });
      else res.status(400).json({ message: "Country could not be deleted" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Oh oh, the server has presented an error, try again later x_x",
      });
    });
};

module.exports = {
  createCountry,
  find,
  findCountry,
  updateCountry,
  deleteCountry,
};
