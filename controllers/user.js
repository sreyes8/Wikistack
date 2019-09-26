const express = require("express");
const { User } = require("../models");
const userList = require("../views/userList");
const router = express.Router();

router.get("/", async function(req, res) {
  let users = await User.findAll();
  res.send(userList(users));
});

router.post("/", async function(req, res) {
  const name = req.body.name;
  const email = req.body.email;

  User.create({
    name,
    email
  });
  res.redirect("/users");
});

router.get("/:id", async function(req, res) {
  const user = await User.findByPk(req.params.id);
  console.log(user);
  res.json(user);
});

router.put("/:id", async function(req, res) {
  const userUpdated = await User.update(
    { name: req.body.name, email: req.body.email },
    { where: { id: req.params.id } }
  );
  res.send(userUpdated);
});

router.delete("/:id", async function(req, res) {
  User.destroy({ where: { id: req.params.id } }).then(deletedUser => {
    res.send(`Has user been deleted? 1 means yes, 0 means no: ${deletedUser}`);
  });
});
module.exports = router;
