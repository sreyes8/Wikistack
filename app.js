const express = require("express");
const morgan = require("morgan");
const layout = require("./views/layout")
const {db} = require('./models')
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan)

db.authenticate().
  then(() => {
    console.log('connected to the database');
  })

app.get("/", function(req, res) {
  res.send(layout(""));
});

app.listen(3000);
