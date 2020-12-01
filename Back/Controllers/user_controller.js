const jwt = require("jsonwebtoken");
const User = require("../Database/Models/users_model");
const bcrypt = require("bcryptjs");
require("dotenv").config();

/* encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
}; */

//SIGNUP USERS
const signUp = async (data) => {
  return new Promise(async (res, rejc) => {
    if (
      !data.name ||
      !data.lastname ||
      !data.email ||
      !data.password ||
      !data.rol
    ) {
      rejc({ status: 406, message: "Please fill all fields" });
    } else {
      bcrypt.hash(data.password, 10, (err, hash) => {
        if (err) {
          rejc({
            status: 500,
            message:
              "Sorry, the server has presented an error. Try again later",
          });
        } else {
          data.password = hash;
          User.create(data)
            .then((user) => {
              res(user);
            })
            .catch((err) => {
              rejc({
                status: 500,
                message:
                  "Sorry, the server has presented an error. Try again later",
              });
            });
        }
      });
    }
  });
};

//LOGIN USUARIOS
const login = (email, password) => {
  return new Promise(async (res, rejc) => {
    if (!email || !password) {
      rejc({ status: 406, message: "Please fill all fields" });
    } else {
      let user = await User.findOne({ where: { email: email } });
      let comparePassword = await bcrypt.compare(password, user.password);
      console.log(user);
      console.log(comparePassword);
      if (user && comparePassword) {
        delete user.password;
        res(
          jwt.sign(user, process.env.SECRET, {
            expiresIn: "1h",
          })
        );
      } else {
        rejc({ status: 401, message: `Invalid password o user` });
      }
    }
  });
};

//FIND ALL USERS
const find = (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Oh oh, the server has presented an error, try again later x_x",
      });
    });
};

//FIND USERS BY ID
const findUser = (req, res) => {
  let id = req.params.id;
  User.findOne({ where: { id: id } }).then((user) => {
    res.status(200).json(user);
  });
};

//UPDATE USER BY ID
const updateUser = (req, res) => {
  let id = req.params.id;
  let data = req.body;

  console.log(data);

  User.update(data, { where: { id: id } })
    .then((response) => {
      if (response[0] === 1)
        res.status(200).json({ message: "User updated successfully :D " });
      else res.status(400).json({ message: "User could not be updated :(" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Oh oh, the server has presented an error, try again later x_x",
      });
    });
};


//DELETE USER BY ID
const deleteUser = (req, res) => {
  let id = req.params.id;
  User.destroy({ where: { id: id } })
    .then((user) => {
      if (user === 1)
        res.status(200).json({ message: "User has been deleted." });
      else res.status(400).json({ message: "User could not be deleted" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Sorry, the server has presented an error. Try again later",
      });
    });
};

module.exports = { signUp, login, find, findUser, updateUser, deleteUser };
