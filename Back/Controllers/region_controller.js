const Region = require("../Database/Models/region_model");

const createRegion = async (req, res) => {
  const { name } = req.body;
  const newRegion = new Region({
    name,
  });
  const savedRegion = await newRegion.save();
  res.status(200).json(savedRegion);
};

const find = (req, res) => {
  Region.findAll()
    .then((region) => {
      res.status(200).json(region);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Oh oh, the server has presented an error, try again later x_x",
      });
    });
};

const findRegion = (req, res) => {
  let id = req.params.id;
  Region.findOne({ where: { id: id } }).then((region) => {
    res.status(200).json(region);
  });
};

const updateRegion = (req, res) => {
  let id = req.params.id;
  let data = req.body;

  console.log(data);
  Region.update(data, { where: { id: id } })
    .then((region) => {
      if (region[0] === 1)
        res.status(200).json({ message: "Region has been updated successfully" });
      else res.status(400).json({ message: "Region could not be updated" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Oh oh, the server has presented an error, try again later x_x",
      });
    });
};

const deleteRegion = (req, res) => {
  let id = req.params.id;
  Region.destroy({ where: { id: id } })
    .then((region) => {
      if (region === 1)
        res.status(200).json({ message: "Region has been successfully deleted" });
      else res.status(400).json({ message: "Region could not be deleted" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Oh oh, the server has presented an error, try again later x_x",
      });
    });
};

module.exports = {
  createRegion,
  find,
  findRegion,
  updateRegion,
  deleteRegion,
};
