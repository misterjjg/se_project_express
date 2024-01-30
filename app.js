const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");
require("dotenv").config();

const helmet = require("helmet");

const { errors } = require("celebrate");

const routes = require("./routes");

const errorHandler = require("./middlewares/errorHandler");

const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3001 } = process.env;
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("connected to db");
  })
  .catch((e) => console.log("db error", e));

app.use(express.json());

app.use(helmet());

app.use(cors());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
