import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(cors()); // Enable CORS for all origins
app.use(express.json());

// Replace with your Fast2SMS API Key
const FAST2SMS_API_KEY = "OSj5frcV81gNlFTvK6qLnZitCdpDzYGo9yWmw2AUeEPxsX4b0JYObgSXxE5tDiUhQHp3jG6sqByv7Toz";

// Temporary OTP store (use DB in production)
let otpStore = {};

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP
app.post("/send-otp", async (req, res) => {
  const { phone } = req.body;
  const otp = generateOTP();

  console.log(`Generated OTP for ${phone}: ${otp}`); // Print OTP

  otpStore[phone] = otp;

  try {
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",
        message: `Your OTP is ${otp}`,
        language: "english",
        flash: 0,
        numbers: phone,
      },
      {
        headers: {
          authorization: FAST2SMS_API_KEY,
        },
      }
    );

    console.log("Fast2SMS response:", response.data); // Print API response

    res.json({ success: true, message: "OTP sent!", otp }); // otp shown here just for testing
  } catch (error) {
    console.error("Error sending OTP:", error.message); // Print error
    res.status(500).json({ success: false, error: error.message });
  }
});

// Verify OTP
app.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;
  if (otpStore[phone] === otp) {
    delete otpStore[phone]; // clear after success
    res.json({ success: true, message: "OTP verified!" });
  } else {
    res.status(400).json({ success: false, message: "Invalid OTP" });
  }
});
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));