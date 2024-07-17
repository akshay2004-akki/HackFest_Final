import { ContactMessage } from "../models/contactUs.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config({ path: "./.env" });



export const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    throw new ApiError(400, "Please fill all the fields");
  }

  const newMessage = await ContactMessage.create({ name, email, subject, message });

  return res.status(201).json(new ApiResponse(201), newMessage, "Contact us form submitted")
  
});