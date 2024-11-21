const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel, AdminModel, CourseModel } = require("../db");
const { z } = require("zod");
const { adminMiddleware } = require("../middleware/admin");

const ADMIN_JWT_SECREATE = process.env.ADMIN_JWT_SECREATE;
const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {
  const requiredBody = z.object({
    email: z.string().min(5).email(),
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    password: z.string().min(8).toUpperCase().toLowerCase(),
  });

  const parsedDataWithSuccess = await requiredBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    res.json({
      message: "data is not in correct format",
      error: parsedDataWithSuccess.error,
    });
  }
  const { email, password, firstName, lastName } = req.body;

  const hash = await bcrypt.hash(password, 5);

  try {
    await AdminModel.create({
      email: email,
      password: hash,
      firstName: firstName,
      lastName: lastName,
    });
    res.status(200).json({ message: "user created" });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
});

adminRouter.post("/login", async (req, res) => {
  const requiredBody = z.object({
    email: z.string().min(5).email(),
    password: z.string().min(8).toUpperCase().toLowerCase(),
  });

  const parsedDataWithSuccess = requiredBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    res.json({
      message: "data is not in correct format",
      error: parsedDataWithSuccess.error,
    });
  }
  const { email, password } = req.body;

  try {
    const user = await AdminModel.findOne({
      email: email,
    });
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    console.log("database password:", user.password, "password", password);
    const isCorrectPassword = bcrypt.compare(password, user.password);
    if (isCorrectPassword) {
      const token = jwt.sign(
        {
          adminId: user._id,
        },
        ADMIN_JWT_SECREATE
      );
      res.status(200).json({
        token: token,
      });
    } else {
      res.status(403).json({ message: "wrong password" });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
});

adminRouter.post("/course", adminMiddleware, async (req, res) => {
  const { title, description, imageUrl, price } = req.body;
  const { adminid } = req.headers;
  try {
    const course = await CourseModel.create({
      title,
      description,
      imageUrl,
      price,
      createrId: adminid,
    });
    res.status(200).json({ message: "course created", courseId: course._id });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = {
  adminRouter,
};
