const express = require("express");
const accountRoute = express.Router();

accountRoute.post("/", async (req, res) => {
  try {
    res.json({ msg: "account" });
  } catch (error) {
    res.json(error);
  }
});
accountRoute.delete("/:id", async (req, res) => {
  try {
    res.json({ msg: "delete account" });
  } catch (error) {
    res.json(error);
  }
});
accountRoute.put("/:id", async (req, res) => {
  try {
    res.json({ msg: "update account" });
  } catch (error) {
    res.json(error);
  }
});

module.exports = accountRoute;
