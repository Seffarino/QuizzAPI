const jwt = require("jsonwebtoken");

//The next middleware runs only if the token is valid
const verifyToken = (req, res, next) => {
  console.log("Verify JWT");
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  // /!\ Create req.email - req.isAdmin - req.userId
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.email = decoded.UserInfo.email;
    req.isAdmin = decoded.UserInfo.isAdmin;
    req.userId = decoded.UserInfo.id;
    next();
  });
};
//The next middleware runs only if the token is valid and the user is an admin
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "Forbidden not admin" });
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAdmin };
