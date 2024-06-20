const { Income } = require("../models");

const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.findAll({ where: { userId: req.user.id } });
    res.status(200).json(incomes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching incomes" });
  }
};

const addIncome = async (req, res) => {
  const { amount, source, date, userId } = req.body;

  if (!amount || !source || !date || !userId) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newIncome = await Income.create({ amount, source, date, userId });
    res.status(201).json(newIncome);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error adding income" });
  }
};

const updateIncome = async (req, res) => {
  const { id } = req.params;
  const { amount, source, date } = req.body;

  try {
    const income = await Income.findByPk(id);
    if (!income) {
      return res.status(404).json({ error: "Income not found" });
    }

    income.amount = amount;
    income.source = source;
    income.date = date;
    await income.save();

    res.status(200).json(income);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating income" });
  }
};

const deleteIncome = async (req, res) => {
  const { id } = req.params;

  try {
    const income = await Income.findByPk(id);
    if (!income) {
      return res.status(404).json({ error: "Income not found" });
    }

    await income.destroy();
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting income" });
  }
};

module.exports = { getIncomes, addIncome, updateIncome, deleteIncome };
