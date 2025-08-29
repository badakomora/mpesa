const express = require("express");
const { handleWithdrawals } = require("../controller/withdrawController");
const { generateToken } = require("../middleware/generateToken");

const router = express.Router();

router.post("/withdraw", generateToken, handleWithdrawals);


// callbacks from Safaricom
router.post("/b2c/result", (req, res) => {
  console.log("B2C Result:", req.body);
  res.sendStatus(200);
});

router.post("/b2c/timeout", (req, res) => {
  console.log("B2C Timeout:", req.body);
  res.sendStatus(200);
});


module.exports = router;
