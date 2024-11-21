const jwt = require("jsonwebtoken");

const ADMIN_JWT_SECREATE = process.env.ADMIN_JWT_SECREATE;
const adminMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decodedData = jwt.verify(token, ADMIN_JWT_SECREATE);
    req.headers.adminid = decodedData.adminId;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = { adminMiddleware };
