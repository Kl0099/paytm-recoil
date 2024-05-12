const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
    },
    Balance: {
      type: mongoose.Schema.Types.ObjectId,
      Ref: "Balance",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
