const mongoose = require("mongoose");
const balanceSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      Ref: "User",
    },
    reciever: {
      type: mongoose.Schema.Types.ObjectId,
      Ref: "User",
    },
    Amount: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Balance", balanceSchema);
