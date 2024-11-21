const jwt = require("jsonwebtoken");

const USER_JWT_SECREATE = process.env.USER_JWT_SECREATE;
const userMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decodedData = jwt.verify(token, USER_JWT_SECREATE);
    req.headers.userid = decodedData.userId;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = { userMiddleware };
