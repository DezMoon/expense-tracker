// src/components/Dashboard/Expenses.js

import React from "react";
import { Bar } from "react-chartjs-2";

const Expenses = ({ expenses }) => {
  // Example data
  const data = {
    labels: expenses.map((expense) => expense.description),
    datasets: [
      {
        label: "Expense Amount",
        data: expenses.map((expense) => expense.amount),
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div>
      <h2>Expenses</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Expenses;
