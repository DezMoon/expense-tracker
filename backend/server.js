const express = require("express");
const dotenv = require("dotenv");
const { sequelize } = require("./models");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

dotenv.config();

console.log("JWT_SECRET:", process.env.JWT_SECRET);

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await sequelize.authenticate();
  console.log("Database connected!");
});
