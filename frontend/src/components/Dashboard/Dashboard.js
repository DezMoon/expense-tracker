import React, { useState } from "react";
import ExpenseForm from "../ExpenseForm";
import IncomeForm from "../IncomeForm";
import ExpenseList from "../ExpenseList";
import IncomeList from "../IncomeList";
import { useAuth } from "../../contexts/AuthContext";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const { userId } = useAuth();

  const handleExpenseAdded = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  const handleIncomeAdded = (income) => {
    setIncomes((prevIncomes) => [...prevIncomes, income]);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <ExpenseForm onExpenseAdded={handleExpenseAdded} />
      <IncomeForm userId={userId} onIncomeAdded={handleIncomeAdded} />
      <ExpenseList expenses={expenses} />
      <IncomeList incomes={incomes} />
    </div>
  );
};

export default Dashboard;
