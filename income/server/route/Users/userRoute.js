const express = require("express");
const userRoute = express.Router();
const user = require("../../model/user");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utils/generateToken");
const isLogin = require("../../middlewares/isLogin");

userRoute.post("/register", async (req, res, next) => {
  const { username, password, email } = req.body;
  try {
    //check if email exist
    const userFound = await user.findOne({ email });
    if (userFound) {
      next(new Error("User already exist"));
    }
    //check if all fileds entered
    if (!username || !password || !email) {
      next(new Error("Please fill all"));
    }
    const salt = await bcrypt.genSalt(10);
    const hassedPassword = await bcrypt.hash(password, salt);
    //create user
    const userR = await user.create({
      username,
      password: hassedPassword,
      email,
    });

    res.json({
      status: "success",
      username: userR.username,
      id: userR._id,
    });
    res.json({ msg: "success" });
  } catch (error) {
    next(new Error(error));
  }
});

userRoute.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //check if email exist
    const userFound = await user.findOne({ email });
    if (!userFound) {
      next(new Error("Invalid Login"));
    }
    //check for password valid or not
    const isPasswordFound = await bcrypt.compare(password, userFound.password);
    if (!isPasswordFound) {
      next(new Error("Invalid Login"));
    }

    res.json({
      status: "Login success",
      username: userFound.username,
      id: userFound._id,
      token: generateToken(userFound._id),
    });
  } catch (error) {
    next(new Error(error));
  }
});
userRoute.get("/profile", isLogin, async (req, res) => {
  try {
    const userFound = await user.findById(req.user).populate({
      path: "accounts",
      populate: {
        path: "transactions",
        model: "transaction",
      },
    });
    res.json(userFound);
  } catch (error) {
    res.json(error);
  }
});
userRoute.delete("/", isLogin, async (req, res) => {
  try {
    const userFound = await user.findByIdAndDelete(req.user);
    res.status(200).json({
      status: "sucess",
      data: null,
    });
    res.json({ msg: "Delete" });
  } catch (error) {
    res.json(error);
  }
});
userRoute.put("/profile", isLogin, async (req, res, next) => {
  try {
    const userFound = await user.findOne({ email: req.body.email });
    if (userFound) {
      return next(new Error("Email is taken or you already have this email"));
    }
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const userUpdate = await user.findByIdAndUpdate(
        req.user,
        {
          password: hashedPassword,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({
        status: "sucess",
        data: userUpdate,
      });
    }
    const userUpdate = await user.findByIdAndUpdate(req.user, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "sucess",
      data: userUpdate,
    });
  } catch (error) {
    next(new Error(error.message));
  }
});
module.exports = userRoute;
