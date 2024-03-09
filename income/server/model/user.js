const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hasAccount: {
      type: Boolean,
      default: false,
    },
    accounts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
      },
    ],
  },
  {
    timestamps: true,
  }
);
