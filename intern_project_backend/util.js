const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(id, email, roles) {
  let payload = {
    id,
    email,
    roles,
  };

  let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
  return token;
}

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).json({ message: "NO TOKEN" });

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ message: "INVALID TOKEN" });
    req.id = payload.id;
    req.email = payload.email;
    req.roles = payload.roles;
    next();
  });
}

function allowedRoles(allowedRoles) {
  return function (req, res, next) {
    let roles = req.roles;

    for (let i = 0; i < roles.length; i++) {
      if (allowedRoles.includes(roles[i])) {
        next();
        return;
      }
    }
  };
}

module.exports = {
  generateToken,
  verifyToken,
  allowedRoles,
};
