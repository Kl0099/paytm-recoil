const User = require("../model/user");

const bcrypt = require("bcrypt");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = User.find({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const matchpassword = await bcrypt.compare(password, user.password);
    if (!matchpassword) {
      return res.status(404).json({
        success: false,
        message: "Password is incorrect",
      });
    }
    const payload = {
      email: user.email,
      id: user._id,
    };
    const token = jwt.sign(payload, "jsontokens", {
      expiresIn: "7d",
    });
    user.token = token;
    user.password = undefined;
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 3600 * 1000),
      sameSite: "None",
      secure: false,
    };

    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: "login successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existuser = await User.find({ email: email });
    if (existuser) {
      return res.status(404).json({
        success: false,
        message: "user already exists",
      });
    }

    const hashespassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name,
      email: email,
      password: hashespassword,
    });
    const payload = {
      email: user.email,
      id: user._id,
    };
    const token = jwt.sign(payload, "jsontokens", {
      expiresIn: "7d",
    });
    user.token = token;
    user.password = undefined;
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 3600 * 1000),
      sameSite: "None",
      secure: false,
    };

    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: "signup successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.sendMoney = async (req, res) => {
  try {
    const { amount, senderId, recieverId } = req.body;
    const sender = await User.findById(senderId);
    if (!sender) {
      return res.status(404).json({
        success: false,
        message: "no sender",
      });
    }
    const reciever = await User.findById(recieverId);
    if (!reciever) {
      return res.status(404).json({
        success: false,
        message: "no reciever",
      });
    }
    if (sender.totalBalance < amount) {
      return res.status(404).json({
        success: false,
        message: "balance is too low",
      });
    }
    reciever.totalBalance += amount;
    reciever.AccountBalance.push({
      amount: amount,
      sender: senderId,
    });
    await reciever.save();
    sender.totalBalance -= amount;
    sender.sendAmount.push({
      sendAmount: amount,
      reciever: recieverId,
    });
    await sender.save();
    return res.status(200).json({
      success: true,
      message: "amount send successfully",
      user: sender,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "server error ",
    });
  }
};
exports.createUser = async (req, res) => {
  try {
    const password = "vijay";
    const email = "vijay@gmail.com";
    const hashespassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: "Vijay Maliye",
      email: email,
      password: hashespassword,
      totalBalance: 10000,
    });
    await user.save();
    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
