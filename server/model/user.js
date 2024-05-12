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
    totalBalance: {
      type: Number,
    },
    // means paise bhejene wala kon kon hai
    AccountBalance: [
      {
        amount: Number,
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    //means isne kis kis ko paise bheje hai

    sendAmount: [
      {
        sendAmount: Number,
        reciever: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
