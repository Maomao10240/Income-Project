const express = require("express");
const userRoute = express.Router();
const user = require("../../model/user");
const bcrypt = require("bcryptjs");
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
    });
  } catch (error) {
    next(new Error(error));
  }
});
userRoute.get("/profile/:id", async (req, res) => {
  try {
    res.json({ msg: "profile" });
  } catch (error) {
    res.json(error);
  }
});
userRoute.delete("/:id", async (req, res) => {
  try {
    res.json({ msg: "Delete" });
  } catch (error) {
    res.json(error);
  }
});
userRoute.put("/:id", async (req, res) => {
  try {
    res.json({ msg: "Update" });
  } catch (error) {
    res.json(error);
  }
});
module.exports = userRoute;
