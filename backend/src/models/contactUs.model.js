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
    }

},{timestamps:true})