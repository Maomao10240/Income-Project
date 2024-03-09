const express = require("express");
const userRoute = express.Router();
userRoute.post("/register", async (req, res) => {
  try {
    res.json({ msg: "Register" });
  } catch (error) {
    res.json(error);
  }
});

userRoute.post("/login", async (req, res) => {
  try {
    res.json({ msg: "Login" });
  } catch (error) {
    res.json(error);
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
