const User = require("../Models/users_model");
const bcrypt = require("bcryptjs");

const createUser = async () => {
  try {
    const count = await User.estimatedDocumentCount();
    if (count > 0) return;
    const values = await Promise.all([
      new User({ name: "Alondra", lastname: "Ghotam", email:"alondra@acamica.com", password: await User.encryptPassword("666666"), rol: "admin" }).save(),
      new User({ name: "Christopher", lastname: "Ricardio", email:"christopher@acamica.com", password: await User.encryptPassword("666666"), rol: "user" }).save(),
    ]);
    console.log(values);    
  } catch (error) {
    console.error(error);
  }
};


createUser();

module.exports = createUser;