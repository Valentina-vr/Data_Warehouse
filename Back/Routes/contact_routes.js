const express = require("express");
const router = express.Router();

const {
  createContact,
  find,
  findContactById,
  updateContactById,
  deleteContactById,
} = require("../Controllers/contact_controller");

router.post("/create", (req, res) => {
  createContact(req, res);
});

router.get("/find", (req, res) => {
  find(req, res);
});

router.get("/findContact/:id", (req, res) => {
  findContactById(req, res);
});

router.put("/updateContact/:id", (req, res) => {
  updateContactById(req, res);
});

router.delete("/deleteContact/:id", (req, res) => {
  deleteContactById(req, res);
});

module.exports = router;