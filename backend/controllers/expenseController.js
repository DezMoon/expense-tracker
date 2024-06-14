const asyncHandler = require("express-async-handler");
const { Expense } = require("../models");

// @desc    Get all expenses for the logged in user
// @route   GET /api/expenses
// @access  Private
const getExpenses = asyncHandler(async (req, res) => {
  const expenses = await Expense.findAll({ where: { userId: req.user.id } });
  res.json(expenses);
});

// @desc    Add a new expense
// @route   POST /api/expenses
// @access  Private
const addExpense = asyncHandler(async (req, res) => {
  const { amount, description } = req.body;

  const expense = await Expense.create({
    amount,
    description,
    userId: req.user.id,
  });

  res.status(201).json(expense);
});

// @desc    Update an expense
// @route   PUT /api/expenses/:id
// @access  Private
const updateExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findByPk(req.params.id);

  if (expense && expense.userId === req.user.id) {
    expense.amount = req.body.amount || expense.amount;
    expense.description = req.body.description || expense.description;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } else {
    res.status(404);
    throw new Error("Expense not found");
  }
});

// @desc    Delete an expense
// @route   DELETE /api/expenses/:id
// @access  Private
const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findByPk(req.params.id);

  if (expense && expense.userId === req.user.id) {
    await expense.destroy();
    res.json({ message: "Expense removed" });
  } else {
    res.status(404);
    throw new Error("Expense not found");
  }
});

module.exports = { getExpenses, addExpense, updateExpense, deleteExpense };
