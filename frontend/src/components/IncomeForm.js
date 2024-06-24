import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const IncomeForm = ({ onIncomeAdded }) => {
  const { userId, isAuthenticated, token } = useAuth();
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated || !token) {
      console.error("Not authenticated");
      return;
    }

    if (!amount || !source || !date) {
      console.error("All fields are required");
      return;
    }

    console.log("Request data:", { amount, source, date, userId });

    if (!userId) {
      console.error("userId is undefined. Ensure it's fetched from useAuth");
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.post(
        "http://localhost:5000/api/incomes",
        { amount, source, date, userId },
        config
      );
      console.log("Income added", response.data);
      setAmount("");
      setSource("");
      setDate("");
      if (onIncomeAdded) {
        onIncomeAdded(response.data);
      }
    } catch (error) {
      console.error("Error adding income", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data.error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Amount</label>
        <input
          type="number"
          value={amount || ""}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Source</label>
        <input
          type="text"
          value={source || ""}
          onChange={(e) => setSource(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          value={date || ""}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Income</button>
    </form>
  );
};

export default IncomeForm;
