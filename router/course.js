const { Router } = require("express");

const courseRouter = Router();

courseRouter.post("/purchase", (req, res) => {
  res.json({
    message: "do you really want to purchase this course go to telegram bud!",
  });
});
courseRouter.get("/", (req, res) => {
  res.json({ message: "these are all the courses" });
});

module.exports = {
  courseRouter: courseRouter,
};
