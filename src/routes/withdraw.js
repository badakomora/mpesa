const express = require("express");
const { handleWithdrawals } = require("../controller/withdrawController");
const { generateToken } = require("../middleware/generateToken");

const router = express.Router();

router.post("/withdraw", generateToken, handleWithdrawals);

module.exports = router;
