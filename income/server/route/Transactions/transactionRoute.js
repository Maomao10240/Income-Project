const express = require("express");
const transactionRoute = express.Router();
const isLogin = require("../../middlewares/isLogin");
const user = require("../../model/user");
const account = require("../../model/account");
const transaction = require("../../model/transaction");

transactionRoute.post("/", isLogin, async (req, res, next) => {
  const { name, transactionType, amount, category, notes, accountF } = req.body;
  try {
    //find the user
    const userFound = await user.findById(req.user);

    if (!userFound) {
      next(new Error("user not found"));
    }
    //console.log(userFound);

    //find the account
    const accountFound = await account.findById(accountF);
    if (!accountFound) {
      return next(new Error("account not found"));
    }
    console.log(accountFound);
    const newTransaction = await transaction.create({
      name,
      transactionType,
      amount,
      category,
      notes,
      account,
      createdBy: req.user,
    });
    accountFound.transactions.push(newTransaction._id);
    await accountFound.save();
    res.json({ status: "success", data: newTransaction });
  } catch (error) {
    res.json(error);
  }
});
transactionRoute.get("/", async (req, res) => {
  try {
    const trans = await transaction.find();
    res.status(200).json({
      status: "success",
      data: trans,
    });
  } catch (error) {
    next(new Error(error.message));
  }
});
transactionRoute.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const tran = await transaction.findById(id);
    res.status(200).json({
      status: "success",
      data: tran,
    });
  } catch (error) {
    next(new Error(error.message));
  }
});
transactionRoute.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const tran = await transaction.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: tran,
    });
    res.json({ msg: "update trans" });
  } catch (error) {
    next(new Error(error.message));
  }
});
module.exports = transactionRoute;
