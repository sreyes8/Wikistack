const express = require("express");
const Sequelize = require("sequelize");
const router = express.Router();
const { Page } = require("../models");
const main = require("../views/main");
const addPage = require("../views/addPage")

router.get("/", async function(req, res) {
  let pages = await Page.findAll();
  pages = pages.map(page => `<li> Title: ${page.title} Slug: ${page.slug} Content: ${page.content}</li>`);
  console.log(pages);
  res.send(main(pages));
});

router.post("/", async function(req, res) {
  const title = req.body.title;
  const slug = req.body.title;
  const content = req.body.content;
  Page.create({
    title,
    slug,
    content
  })
  res.redirect('/')
})

router.get("/add", async function(req,res) {
  res.send(addPage())
})

module.exports = router;
