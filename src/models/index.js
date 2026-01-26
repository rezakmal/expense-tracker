const sequelize = require("../config/database");
const User = require("./User");
const Expense = require("./Expense");

User.hasMany(Expense, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Expense.belongsTo(User, {
  foreignKey: "userId"
});

module.exports = { sequelize, User, Expense }