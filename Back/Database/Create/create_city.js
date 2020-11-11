const bcrypt = require("bcryptjs");
const City = require("../Models/city_model");

const createCity = async () => {
    try {
      const count = await City.estimatedDocumentCount();
      if (count > 0) return;
        const values = await Promise.all([
            new City({ name: "Medellin" }).save(),
            new City({ name: "Lima" }).save(),
        ]);
      console.log(values);
    } catch (error) {
      console.error(error);
    }
};
createCity();
  
module.exports = createCity;