const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { secret, expiresIn } = require("../config/jwt");

exports.register = async (req, res) => {
  const { email, password, username } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ email, password: hashedPassword, username });

  res.status(201).json({ message: "User registered", userId: user.id });
};

exports.login = async (req,res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Password is not matched" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    secret,
    { expiresIn }
  );

  res.json({ token });
};