const express = require("express");
const {  handleDeposits } = require("../controller/depositController");
const { generateToken } = require("../middleware/generateToken");

const router = express.Router();

router.post("/deposit", generateToken,  handleDeposits);

module.exports = router;
