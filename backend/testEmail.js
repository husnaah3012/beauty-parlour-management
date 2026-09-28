require("dotenv").config();

const sendEmail = require("./utils/emailService");

sendEmail(
    process.env.EMAIL_USER,
    "Beauty Parlour Test Email",
    "Hello! Nodemailer is working successfully."
);