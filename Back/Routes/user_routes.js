const express = require("express");
const router = express.Router();

const authorization = require("../Middlewares/authorization");
const authentication = require("../Middlewares/authentication");
const CheckDuplicateEmail = require("../Middlewares/verify");

const {
  signUp,
  login,
  find,
  findUser,
  updateUser,
  deleteUser,
} = require("../Controllers/user_controller");

router.post("/signup",
/*   CheckDuplicateEmail,
  authentication,
  authorization,  */
  (req, res) => {
  signUp(req.body)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(error.status).json(error.message);
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  login( email, password)
  .then((jwt) => {
    res.status(200).json(jwt);
  })
  .catch((error) => {
    res.status(error.status).json(error.message);
  });
});

router.get("/find", (req, res) => {
  find(req, res);
});

router.get("/findUser/:id", (req, res) => {
  findUser(req, res);
});

router.put("/updateUser/:id", (req, res) => {
  console.log(req.body);
  updateUser(req, res);
});

router.delete("/delete/:id",(req, res) => {
  deleteUser(req, res);
});

module.exports = router;
