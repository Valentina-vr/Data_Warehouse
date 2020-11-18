const Contact = require("../Database/Models/contact_model");

const createContact = async (req, res) => {
  const {
    name,
    lastname,
    role,
    email,
    company,
    region,
    country,
    city,
    address,
    interest,
  } = req.body;
  const newContact = new Contact({
    name,
    lastname,
    role,
    email,
    company,
    region,
    country,
    city,
    address,
    interest,
  });
  const savedContact = await newContact.save();
  res.status(200).json(savedContact);
};

const find = (req, res) => {
  Contact.findAll()
    .then((contact) => {
      res.status(200).json(contact);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Oh oh, the server has presented an error, try again later x_x",
      });
    });
};

const findContact = (req, res) => {
  let id = req.params.id;
  Contact.findOne({ where: { id: id } }).then((contact) => {
    res.status(200).json(contact);
  });
};

const deleteContact = (req, res) => {
  let id = req.params.id;
  Contact.destroy({ where: { id: id } })
    .then((contact) => {
      if (contact === 1)
        res.status(200).json({ message: "Contact has been deleted successfully" });
      else res.status(400).json({ message: "Contact could not be deleted" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Oh oh, the server has presented an error, try again later x_x",
      });
    });
};

const updatecontact = (req, res) => {
  let id = req.params.id;
  let data = req.body;

  console.log(data);
  Contact.update(data, { where: { id: id } })
    .then((contact) => {
      if (contact[0] === 1)
        res.status(200).json({ message: "contact has been updated successfully" });
      else res.status(400).json({ message: "Contact could not be updated" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Oh oh, the server has presented an error, try again later x_x",
      });
    });
};

module.exports = {
  createContact,
  find,
  findContact,
  updatecontact,
  deleteContact,
};
