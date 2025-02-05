import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      const err = new Error("Authentication failed!");
      err.status = 403;
      return next(err);
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new Error("Authentication failed!");
    error.status = 403;
    return next(error);
  }
};

export default authMiddleware;
