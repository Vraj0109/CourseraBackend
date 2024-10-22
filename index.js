const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { UserModel } = require("./db");
const { userRouter } = require("./router/user");
const { courseRouter } = require("./router/course");

const app = express();

app.use(express.json());

app.use("/user", userRouter);

app.use("/course", courseRouter);

const startServer = async () => {
  const mongoUrl = process.env.MONGO_URL;
  console.log(mongoUrl);
  await mongoose.connect(mongoUrl);
  app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
  });
};

startServer();
