import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const ExpenseForm = ({ onExpenseAdded }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const { isAuthenticated, token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated || !token) {
      console.error("Not authenticated");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/expenses",
        { amount, description, category, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onExpenseAdded(response.data);
      setAmount("");
      setDescription("");
      setCategory("");
      setDate("");
    } catch (error) {
      console.error("Error adding expense", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
