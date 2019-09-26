const express = require("express");
const morgan = require("morgan");
const layout = require("./views/layout");
const { db } = require("./models");
const wikiRoutes = require("./controllers/wiki");
const userRoutes = require("./controllers/user");
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.get("/", function(req, res) {
  res.send(layout(""));
});

app.use("/wiki", wikiRoutes);
app.use("/user", userRoutes);

const init = async () => {
  await db.sync().then(
    app.listen(PORT, () => {
      console.log(`Server is listening on post ${PORT}!`);
    })
  );
};

init();
