const verify = require("../utils/verify");

const isLogin = (req, res, next) => {
  //get token from request header
  const headerObj = req.headers;
  const token = headerObj["authorization"].split(" ")[1];
  //verify
  if (token != undefined) {
    const result = verify(token);

    if (!result) {
      next(new Error("Invalid token"));
    }
    req.user = result.id;
    next();
  } else {
    return {
      status: "failed",
      message: "There is no token attached",
    };
  }

  //save
};
module.exports = isLogin;
