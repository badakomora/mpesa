const axios = require("axios");

const handleWithdrawals = async (req, res) => {
  try {
    const { amount, phone } = req.body;

    if (!amount || !phone) {
      return res.status(400).json({ error: "Amount and phone are required" });
    }

    // Access token already generated in generateToken middleware
    const token = req.token;


    // Environment variables
    const shortcode = process.env.MPESA_B2C_SHORTCODE; // Your B2C shortcode (Paybill/Till)
    const initiatorName = process.env.MPESA_INITIATOR_NAME; // Initiator name created in Daraja portal
    const securityCredential = process.env.MPESA_SECURITY_CREDENTIAL; // Encrypted password from Daraja

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest",
      {
        InitiatorName: initiatorName,
        SecurityCredential: securityCredential,
        CommandID: "BusinessPayment", // Can also be "SalaryPayment" or "PromotionPayment"
        Amount: amount,
        PartyA: shortcode, // The shortcode sending money
        PartyB: phone, // The customer receiving money
        Remarks: "Withdrawal",
        QueueTimeOutURL: "https://mpesa-2wcl.onrender.com/api/b2c/timeout",
        ResultURL: "https://mpesa-2wcl.onrender.com/api/b2c/result",
        Occasion: "TestWithdrawal",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.json({
      success: true,
      message: "Withdrawal request sent",
      data: response.data,
    });
  } catch (error) {
    console.error("Withdrawal error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Withdrawal failed",
      error: error.response?.data || error.message,
    });
  }
};

module.exports = { handleWithdrawals };
