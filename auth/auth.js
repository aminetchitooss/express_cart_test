function authMiddleWare(req, res, next) {
  // here validating the token
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Unauthorized access, make sure to put a token bro" });
  }
  req.iduser = getUserIdFromToken(req.headers.authorization);
  next();
}

function getUserIdFromToken(pAuth) {
  //getting user id from token
  return pAuth;
}

module.exports = { getUserIdFromToken, authMiddleWare };
