const express = require("express");

const mongoose = require("mongoose");

const routes = require("./routes");

const helmet = require("helmet");

const { PORT = 3001 } = process.env;
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("connected to db");
  })
  .catch((e) => console.log("db error", e));

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "6530a12d11503c43beaeedd7",
  };
  next();
});

app.use(helmet());

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
