const jwt = require("jsonwebtoken");

const verify = (token) => {
  return jwt.verify(token, "anykey", (err, decoded) => {
    if (err) {
      //need to return false. String is always true;
      return false;
    } else {
      return decoded;
    }
  });
};
module.exports = verify;
