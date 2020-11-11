const bcrypt = require("bcryptjs");
const Country = require("../Models/country_model");

const createCountry = async () => {
    try {
      const count = await Country.estimatedDocumentCount();
  
      if (count > 0) return;
  
        const values = await Promise.all([
            new Country({ name: "EEUU" }).save(),
            new Country({ name: "Argentina" }).save(),
        ]);
      console.log(values);

    } catch (error) {
      console.error(error);
    }
  };
  

  createCountry();
  
  module.exports = createCountry;