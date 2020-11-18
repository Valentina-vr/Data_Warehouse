const express = require("express");
const router = express.Router();

const {
  createContact,
  find,
  findContact,
  updatecontact,
  deleteContact,
} = require("../Controllers/contact_controller");

router.post("/create", (req, res) => {
  createContact(req, res);
});

router.get("/find", (req, res) => {
  find(req, res);
});

router.get("/findcontact/:id", (req, res) => {
  findContact(req, res);
});

router.put("/updatecontact/:id", (req, res) => {
  updatecontact(req, res);
});

router.delete("/deletecontact/:id", (req, res) => {
  deleteContact(req, res);
});

module.exports = router;