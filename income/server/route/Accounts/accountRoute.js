const express = require("express");
const accountRoute = express.Router();
const user = require("../../model/user");
const account = require("../../model/account");
const isLogin = require("../../middlewares/isLogin");
const transaction = require("../../model/transaction");

accountRoute.post("/register", isLogin, async (req, res, next) => {
  const { name, initialBalance, accountType, notes } = req.body;

  try {
    const userFound = await user.findById(req.user);
    if (!userFound) {
      next(new Error("User not found"));
    }
    const accountFound = await account.create({
      name,
      initialBalance,
      accountType,
      notes,
      createdBy: req.user,
    });
    userFound.accounts.push(accountFound._id);
    await userFound.save();
    res.json({ status: "success", data: accountFound });
  } catch (error) {
    next(error);
  }
});
accountRoute.get("/", async (req, res) => {
  try {
    const accountFound = await account.find().populate("transactions");
    res.json({ status: "sucess", data: accountFound });
  } catch (error) {
    res.json(error);
  }
});

//find single account
accountRoute.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const accountFound = await account.findById(id).populate("transactions");
    res.json({ status: "sucess", data: accountFound });
  } catch (error) {
    res.json(error);
  }
});
accountRoute.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const accountFound = await account.findByIdAndDelete(id);
    res.json({ msg: "delete account" });
  } catch (error) {
    res.json(error);
  }
});
accountRoute.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const accountFound = await account.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "sucess",
      data: null,
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = accountRoute;
