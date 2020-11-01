const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.SECRET;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid token received" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No token received" });
  }
};

/*
module.exports = (req,res, next) => {
    if(req.session && req.session.user) {
        next();
    }else{
        res.status(401).json({message: "Sorry dude cannot let youin"})
    }
};
*/