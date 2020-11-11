const bcrypt = require("bcryptjs");
const Company = require("../Models/company_model");

const createCompany = async () => {
  try {
    const count = await Company.estimatedDocumentCount();
    if (count > 0) return;
      const values = await Promise.all([
          new Company({ name: "Apple", country: "EEUU", city: "California", address: "st 136 #65", email: "apple@icloud.com", phone: "1365849" }).save(),
          new Company({ name: "Acamica", country: "Argentina", city: "Buenos aires", address: "calle 4657", email: "hola@acamica.com", phone: "5137852574" }).save(),
      ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

createCompany();

module.exports = createCompany;