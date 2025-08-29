const axios = require("axios");
const { timestamp } = require("../utils/timeStamp");

const handleDeposits = async (req, res) => {
  const { phone, amount } = req.body;

  const BUSINESS_SHORT_CODE = process.env.MPESA_BUSINESS_SHORT_CODE;

  if (!BUSINESS_SHORT_CODE) {
    throw new Error("MPESA_BUSINESS_SHORT_CODE is not defined in environment variables.");
  }

  const password = Buffer.from(
    BUSINESS_SHORT_CODE + process.env.MPESA_PASS_KEY + timestamp
  ).toString("base64");

  const payload = {
    BusinessShortCode: BUSINESS_SHORT_CODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phone,
    PartyB: process.env.MPESA_BUSINESS_SHORT_CODE,
    PhoneNumber: phone,
    CallBackURL: "https://yourdomain.com/api/callback", // ⚠️ Must be a valid reachable https endpoint
    AccountReference: "BuySasa online shop",
    TransactionDesc: "Payment",
  };

  try {
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      }
    );

    res.status(201).json({
      message: true,
      data: response.data,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({
      message: "Failed",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = {  handleDeposits };
