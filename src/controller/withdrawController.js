const axios = require("axios");

// B2C Payment
const handleWithdrawals = async (req, res) => {
  const { phoneNumber, amount } = req.body;

  const initiatorName = process.env.MPESA_INITIATOR_NAME;
  const securityCredential = process.env.MPESA_SECURITY_CREDENTIAL;
  const shortcode = process.env.MPESA_B2C_SHORTCODE;

  if (!initiatorName || !securityCredential || !shortcode) {
    throw new Error("Missing required environment variables for B2C");
  }

  try {
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest",
      {
        InitiatorName: initiatorName,
        SecurityCredential: securityCredential,
        CommandID: "BusinessPayment", // or SalaryPayment / PromotionPayment
        Amount: amount,
        PartyA: shortcode,
        PartyB: phoneNumber,
        Remarks: "Payment",
        QueueTimeOutURL: "https://yourdomain.com/api/b2c/timeout",
        ResultURL: "https://yourdomain.com/api/b2c/result",
        Occasion: "Test Payment",
      },
      {
        headers: {
          Authorization: `Bearer ${req.token}`,
        },
      }
    );

    res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
};

module.exports = { handleWithdrawals };
