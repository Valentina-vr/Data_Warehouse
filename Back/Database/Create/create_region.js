const bcrypt = require("bcryptjs");
const Region = require("../Models/region_model");

const createRegion = async () => {
  try {
    const count = await Region.estimatedDocumentCount();
    if (count > 0) return;
      const values = await Promise.all([
          new Region({ name: "Norte America" }).save(),
          new Region({ name: "Sur America" }).save(),
      ]);
    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

createRegion();

module.exports = createRegion;