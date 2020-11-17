const Company = require("../Database/Models/company_model");

const createCompany = async (req, res) => {
  const { name, country, city, address, email, phone } = req.body;
  const newCompany = new Company({
    name,
    country,
    city,
    address,
    email,
    phone,
  });
  const savedCompany = await newCompany.save();
  res.status(200).json(savedCompany);
};

const findCompanies = (req, res) => {
  Company.findAll()
    .then((company) => {
      res.status(200).json(company);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Sorry, the server has presented an error. Try again later",
      });
    });
};

const findCompaniesById = (req, res) => {
  let id = req.params.id;
  Company.findOne({ where: { id: id } }).then((company) => {
    res.status(200).json(company);
  });
};

const updateCompany = (req, res) => {
  let id = req.params.id;
  let data = req.body;
  Company.update(data, { where: { id: id } })
    .then((company) => {
      if (company[0] === 1)
        res.status(200).json({ message: "Company has been updated" });
      else res.status(404).json({ message: "Company could not be updated" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Sorry, the server has presented an error. Try again later",
      });
    });
};

const deleteCompany = (req, res) => {
  let id = req.params.id;
  Company.destroy({ where: { id: id } })
    .then((company) => {
      if (company === 1)
        res.status(200).json({ message: "Company has been deleted." });
      else res.status(400).json({ message: "Company could not be deleted" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Sorry, the server has presented an error. Try again later",
      });
    });
};

module.exports = {
  findCompanies,
  createCompany,
  findCompaniesById,
  updateCompany,
  deleteCompany,
};
