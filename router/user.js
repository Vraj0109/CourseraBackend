const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = Router();

userRouter.post("/signup", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;
});

userRouter.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = UserModel.findOne({
      email: email,
    });
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    const isCorrectPassword = bcrypt.compare(password, user.password);
    if (isCorrectPassword) {
      const token = jwt.sign(
        {
          userId: user._id,
        },
        JWT_SECREATE
      );
      res.json({
        token: token,
      });
    }
  } catch (error) {
    res.status(404).json({ message: "something went wrong" });
  }
});

userRouter.get("/purchases", (req, res) => {
  res.json({ message: "this" });
});

module.exports = {
  userRouter: userRouter,
};
