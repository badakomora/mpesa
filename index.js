// index.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const deposit = require("./src/routes/deposit");
const withdraw = require("./src/routes/withdraw");

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("Daraja API payment gateway");
});
app.use("/transaction", deposit);
app.use("/transaction", withdraw);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
