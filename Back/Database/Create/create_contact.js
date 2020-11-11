const Contact = require("../Models/contact_model");
const bcrypt = require("bcryptjs");

const createContact = async () => {
  try {
    const count = await Contact.estimatedDocumentCount();
    if (count > 0) return;
      const values = await Promise.all([
          new Contact({  name: "Nikki", lastname: "Villada", role: "CEO", email: "nikkivillada@gmail.com", company: "Apple", region: "Norteamerica", country: "EEUU", city: "California", address: "st west #48", interest: "75" }).save(),
          new Contact({  name: "Martin", lastname: "Villada", role: "CIO", email: "martinvillada@gmail.com", company: "Acamica", region: "Latam", country: "Argentina", city: "Buenos aires", address: "Cll 56 b 75-103", interest: "50" }).save(),
      ]);
    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

createContact();
module.exports = createContact;