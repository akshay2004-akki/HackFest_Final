import { ContactMessage } from "../models/contactUs.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: "./.env" });

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmail = (sender ,to, subject, text) => {
  const mailOptions = {
    from : sender,
    to,
    subject,
    text
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.error('Email sent:', info.response);
    }
  });
};

export const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    throw new ApiError(400, "Please fill all the fields");
  }

  const newMessage = await ContactMessage.create({ name, email, subject, message });

  // Send email to the EMAIL_USER
  const emailText = `You have received a new message from ${name} (${email}):\n\nSubject: ${subject}\n\nMessage:\n${message}`;
  sendEmail(email,process.env.EMAIL_USER, `${subject}`, emailText);

  return res.status(201).json(new ApiResponse(201, newMessage, "Contact us form submitted"));
});
