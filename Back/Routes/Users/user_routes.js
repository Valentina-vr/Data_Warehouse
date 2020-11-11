const express = require("express");
const userModel = require("../../Database/Models/users_model");
const router = express.Router();
const authentication = require("../../Middlewares/authentication");
const authorization = require("../../Middlewares/authorization");

const {
  createUser,
  login,
  deleteUser,
  findByEmail,
  updateP,
} = require("./userController");
const { response } = require("express");

//SIGNUP
router.post("/signup", (req, res) => {
  const reqUser = req.body;
  createUser(reqUser)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(error.status).json(error.message);
    });
});

//LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  login(email, password)
    .then((jwt) => {
      res
        .status(200)
        .json(
          "Successful login, the following is your authorization token: " + jwt
        );
    })
    .catch((error) => {
      res.status(error.status).json(error.message);
    });
});

//LIST USERS
router.get("/list", (req, res) => {
  userModel
    .findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json("Oh oh, internal error, please try again later");
    });
});

router.delete("/delete", (req, res) => {
  let email = req.body.email;
  deleteUser(email)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(error).json(error);
    });
});

//FIND USER BY EMAIL
router.get("/user/:email", (req, res) => {
  let email = req.params.email;
  userModel
    .findOne({ where: { email: email } })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(error).json(error);
    });
});

//UPDATE USER
router.patch("/update", (req, res) => {
  let email = req.body.email;
  let data = req.body;
  updateP(email, data)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(error).json(error);
    });
});

module.exports = router;