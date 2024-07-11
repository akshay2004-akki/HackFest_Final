import mongoose, { Schema } from "mongoose";
import validator from "validator";
import crypto from "crypto";
import dotenv from 'dotenv';

dotenv.config({
    path:"./.env"
});

const algorithm = 'aes-256-cbc';
const secretKey = process.env.CRYPTO_SECRET_KEY

const encrypt = (text) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
};

const decrypt = (text) => {
    const [ivHex, encryptedText] = text.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

const studentCreditSchema = new Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    cardNumber : {
        type : String,
        required : true,
    },
    cvv : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : [true, "Email is required"],
        validate : [validator.isEmail, "Invalid email"],
        unique : true
    },
    phone : {
        type : Number,
        required : true,
        unique : true
    },
    address : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    state : {
        type: String,
        required : true
    },
    zipCode : {
        type : Number,
        required : [true, "Zip code required"],
    }
},{timestamps:true});

studentCreditSchema.pre('save', async function(next){
    if(!this.isModified('cvv')) return next();
    try {
        this.cvv =await encrypt(this.cvv);
        next();
    } catch (error) {
        next();
    }
});

export const StudentCredit = mongoose.model("StudentCredit", studentCreditSchema);
