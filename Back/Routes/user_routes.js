const express = require("express");
const router = express.Router();

const authorization = require("../Middlewares/authorization");

const {
  signUp,
  login,
  find,
  findUser,
  updateUser,
  deleteUser,
} = require("../Controllers/user_controller");

router.post("/signup", (req, res) => {
  signUp(req, res);
});

router.post("/login", (req, res) => {
  login(req, res);
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
