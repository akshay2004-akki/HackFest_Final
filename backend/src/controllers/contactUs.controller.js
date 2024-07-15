import { ContactMessage } from "../models/contactUs.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config({ path: "./.env" });

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: "akshay1622004@gmail.com",
    pass: "akshay16A_" 
  }
});

const sendEmail = (fromEmail, name, subject, message) => {
  const mailOptions = {
    from: "2236675.cse.cec@cgc.edu.in",// Your email address
    to: "akshay1622004@gmail.com", // Owner's email address
    // replyTo: fromEmail, // User's email address
    subject: `Contact Form Submission: ${subject}`,
    text: `Name: ${name}\nEmail: ${fromEmail}\n\nMessage:\n${message}`
  };

  return transporter.sendMail(mailOptions);
};

export const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    throw new ApiError(400, "Please fill all the fields");
  }

  const newMessage = await ContactMessage.create({ name, email, subject, message });

  try {
    await sendEmail(email, name, subject, message);

    return res.status(201).json(new ApiResponse(201, newMessage, "Message sent successfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});