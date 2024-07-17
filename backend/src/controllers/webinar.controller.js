import { Webinar } from "../models/webinar.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import nodeMailer from 'nodemailer'

const transporter = nodeMailer.createTransport({
    service : "gmail",
    auth : {
        user : `${process.env.EMAIL_USER}`,
        pass : `${process.env.EMAIL_PASSWORD}`
    }
}) 

const sendEmail = (to,subject, text)=>{
    const mailOptions = {
        from : `${process.env.EMAIL_USER}`,
        to,
        subject,
        text
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
}

export const regiterWbinar = asyncHandler(async(req,res)=>{
    const {name, email, date} = req.body;

    if([name, email, date].some((fields)=>fields?.trim()==="")){
        throw new ApiError(400, "all fields are required");
    }
    const existingDate = await Webinar.findOne({
        $and : [{date},{email}]
    })
    if(existingDate){
        throw new ApiError(400,"You have already register for this date")
    }
    const newWebinar = await Webinar.create({
        name,
        email,
        date : new Date(date).toLocaleString()
    })
    sendEmail(email,)
    return res.status(200).json(new ApiResponse(201, newWebinar,"Registered for webinar successfully"))
})