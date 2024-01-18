const express = require("express");
const mongoose = require("mongoose");

const app = express();
const tasks = require("./routes/tasks");
const dotenv = require("dotenv");
dotenv.config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const cors = require("cors");
const bodyParser = require("body-parser");

// middleware

app.use(express.static("./public"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes

app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("連結到mongodb...");
  })
  .catch((e) => {
    return res.status(500).send("無法儲存使用者。。。");
    return console.log(e);
  });

const start = async () => {
  try {
    await app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
