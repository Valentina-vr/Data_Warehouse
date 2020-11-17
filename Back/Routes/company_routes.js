const express = require("express");
const router = express.Router();

const {
  findCompanies,
  createCompany,
  findCompaniesById,
  updateCompany,
  deleteCompany,
} = require("../Controllers/company_controller");

router.post("/create", (req, res) => {
  createCompany(req, res);
});

router.get("/find", (req, res) => {
  findCompanies(req, res);
});

router.get("/findCompany/:id", (req, res) => {
  findCompaniesById(req, res);
});

router.put("/updatecompany/:id", (req, res) => {
  updateCompany(req, res);
});

router.delete("/deleteCompany/:id", (req, res) => {
  deleteCompany(req, res);
});

module.exports = router;