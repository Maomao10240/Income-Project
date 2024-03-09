const express = require("express");
const transactionRoute = express.Router();
transactionRoute.post("/", async (req, res) => {
  try {
    res.json({ msg: "create trans" });
  } catch (error) {
    res.json(error);
  }
});
transactionRoute.get("/", async (req, res) => {
  try {
    res.json({ msg: "get trans" });
  } catch (error) {
    res.json(error);
  }
});
transactionRoute.delete("/:id", async (req, res) => {
  try {
    res.json({ msg: "delete trans" });
  } catch (error) {
    res.json(error);
  }
});
transactionRoute.put("/:id", async (req, res) => {
  try {
    res.json({ msg: "update trans" });
  } catch (error) {
    res.json(error);
  }
});
module.exports = transactionRoute;
