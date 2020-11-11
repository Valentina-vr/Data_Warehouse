const jwt = require("jsonwebtoken");
const User = require("../Models/users_model");
require("dotenv").config();

//SIGNUP
const signUp = async (req, res) => {
  const { username, email, password, password_confirm, role } = req.body;

  //Validar si el email ya existe
  const emailValidate = await User.findOne({ email: req.body.email });
  if (emailValidate){
    res.status(400).json({ message: "This email is already registeredo" });
  }

  //Crear usuario
  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password),
    password_confirm: await User.encryptPassword(password_confirm),
    rol
  });
  //Guardar usuario
  const savedUser = await newUser.save();
  console.log(savedUser);
  //Notificar
  res.status(200).json('User created successfully');
};

//LOGIN
const login = async (req, res) => {
    //Buscar si el usuario existe
  const userFound = await User.findOne({ email: req.body.email});
  if (!userFound) return res.status(400).json({ message: "User does not exist" });

  //Comparar contraseña
  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password
  );
    //Si esta mal, entonces notifique invalido
  if (!matchPassword)
    return res.status(401).json({ token: null, message: "Invalid password" });
    //Asignar token y ponerlo a expirar en un tiempo determinado
  const token = jwt.sign({ id: userFound._id }, process.env.SECRET, {
    expiresIn: 86400, // 24 hours??????*******************************
  });

  console.log(userFound);
  res.json({ token });
};

module.exports = { signUp, login };