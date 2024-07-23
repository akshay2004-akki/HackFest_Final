import mongoose from "mongoose";
import validator from "validator";


const contactSchema = new mongoose.Schema({

    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        validate : [validator.isEmail, "Enter a valid email"]
    },
    subject : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    }

},{timestamps:true})

export const ContactMessage = mongoose.model("ContactMessage", contactSchema)