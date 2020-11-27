const jwt = require("jsonwebtoken");
const User = require("../Database/Models/users_model");
const bcrypt = require("bcryptjs");
require("dotenv").config();

encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

//SIGNUP USERS
const signUp = async (req, res) => {
  const { name, lastname, email, password, rol } = req.body;
  const newUser = new User({
    name,
    lastname,
    email,
    password: await encryptPassword(password),
    rol,
  });
  const savedUser = await newUser.save();
  res.status(200).json(savedUser);
};

//LOGIN USUARIOS
const login = (req, res) => {
  const userFound = User.findOne({ where: { email: req.body.email } });
  if (!userFound) return res.status(400).json({ message: "User not found" });

  const matchPassword = comparePassword(req.body.password, userFound.password);
  if (!matchPassword)
    return res.status(401).json({ token: null, message: "Invalid password" });

  const token = jwt.sign({ id: userFound.id }, process.env.SECRET, {
    expiresIn: 86400, // 24 hours
  });
  res.status(200).json({ token });
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
