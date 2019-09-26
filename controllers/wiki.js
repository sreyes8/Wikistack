const express = require("express");
const Sequelize = require("sequelize");
const router = express.Router();
const { Page } = require("../models");
const main = require("../views/main");

router.get("/", async function(req, res) {
  let pages = await Page.findAll();
  pages = pages.map(page => `<li> Title: ${page.title} </li>`);
  console.log(pages);
  res.send(main(pages));
});

module.exports = router;
