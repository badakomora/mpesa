const express = require("express");
const { handleStkPush } = require("../controller/stkController");
const { generateToken } = require("../middleware/generateToken");

const router = express.Router();

router.post("/stkpush", generateToken, handleStkPush);

module.exports = router;
