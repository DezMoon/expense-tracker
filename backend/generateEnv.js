const fs = require("fs");
const crypto = require("crypto");

// Generate a random string for JWT_SECRET
const generateSecret = () => {
  return crypto.randomBytes(64).toString("hex");
};

// Read the existing .env file if it exists
let envConfig = {};
if (fs.existsSync(".env")) {
  const env = fs.readFileSync(".env", "utf-8");
  env.split("\n").forEach((line) => {
    const [key, value] = line.split("=");
    envConfig[key.trim()] = value.trim();
  });
}

// Generate a new JWT_SECRET if it doesn't exist in the .env file
if (!envConfig.JWT_SECRET) {
  envConfig.JWT_SECRET = generateSecret();
}

// Write the updated config back to the .env file
const newEnvConfig = Object.entries(envConfig)
  .map(([key, value]) => `${key}=${value}`)
  .join("\n");

fs.writeFileSync(".env", newEnvConfig);

console.log(".env file updated with JWT_SECRET");
