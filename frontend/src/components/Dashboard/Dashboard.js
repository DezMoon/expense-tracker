import React, { useState } from "react";
import ExpenseForm from "../ExpenseForm";
import IncomeForm from "../IncomeForm";
import ExpenseList from "../ExpenseList";
import IncomeList from "../IncomeList";
import { useAuth } from "../../contexts/AuthContext";
import "./Dashboard.css";

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
    <div className="dashboard">
      <div className="balance-card">
        <div className="balance-info">
          <p>Available balance</p>
          <h2>$12,234</h2>
        </div>
        <div className="balance-type">
          <span>Credit</span>
          <div className="balance-icons">{/* Add your card icons here */}</div>
        </div>
      </div>
      <div className="stats">
        <div className="expenses-statistics">
          <h3>Expenses statistics</h3>
          {/* Add your chart component here */}
        </div>
        <div className="send-money">
          <h3>Send money to</h3>
          {/* Add your send money component here */}
        </div>
        <div className="scheduled-payments">
          <h3>Scheduled payments</h3>
          {/* Add your scheduled payments component here */}
        </div>
      </div>
      <div className="forms">
        <ExpenseForm onExpenseAdded={handleExpenseAdded} />
        <IncomeForm userId={userId} onIncomeAdded={handleIncomeAdded} />
      </div>
      <div className="lists">
        <ExpenseList expenses={expenses} />
        <IncomeList incomes={incomes} />
      </div>
    </div>
  );
};

export default Dashboard;
