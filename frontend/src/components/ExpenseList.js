import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const { isAuthenticated, token } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/expenses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses", error);
      }
    };
    fetchExpenses();
  }, [isAuthenticated, token]);

  return (
    <div>
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description}: ${expense.amount} on {expense.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
