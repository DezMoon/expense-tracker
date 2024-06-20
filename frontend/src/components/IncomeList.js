import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const IncomeList = () => {
  const [incomes, setIncomes] = useState([]);
  const { isAuthenticated, token } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    const fetchIncomes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/incomes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIncomes(response.data);
      } catch (error) {
        console.error("Error fetching incomes", error);
      }
    };
    fetchIncomes();
  }, [isAuthenticated, token]);

  return (
    <div>
      <h2>Incomes</h2>
      <ul>
        {incomes.map((income) => (
          <li key={income.id}>
            {income.source}: ${income.amount} on {income.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncomeList;
