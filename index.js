// index.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./src/routes/lipaRoute");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("Daraja API payment gateway");
});
app.use("/lipa", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
