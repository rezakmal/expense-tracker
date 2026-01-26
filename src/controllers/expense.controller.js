const { Expense } = require("../models");
const { getDateFilter } = require("../utils/dateFilter");

// create expense
exports.createExpense = async (req, res) => {
  const { name, category, amount } = req.body;

  const expense = await Expense.create({
    name,
    category,
    amount,
    userId: req.user.id,
  });
  
  res.status(201).json(expense);
};

// get expense
exports.getExpenses = async (req, res) => {
  const { filter } = req.query;

  const expense = await Expense.findAll({
    where: {
      userId: req.user.id,
      ...getDateFilter(filter),
    }
  });
};

// update expense
exports.updateExpense = async (req, res) => {
  const { id } = req.params;

  const expense = await Expense.findOne({
    where: { id, userId: req.user.id },
  });

  if (!expense) {
    return res.status(404).json({ message: "Expense not found" });
  }

  await expense.update(req.body);
  res.json(expense);
};

// delete expense
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  const expense = await Expense.findOne({
    where: { id, userId: req.user.id },
  });

  if (!expense) {
    return res.status(404).json({ message: "Expense not found" });
  }

  await expense.destroy();
  res.json({ message: "Expense deleted" })
}