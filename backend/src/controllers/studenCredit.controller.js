import mongoose from "mongoose";
import { StudentCredit } from "../models/studentGreenCreditForm.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config({
    path : "./.env"
});

const algorithm = 'aes-256-cbc';
const secretKey = process.env.CRYPTO_SECRET_KEY

const encrypt = (text) => {
    console.log("secret key : ",secretKey);

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(text.toString(), 'utf8', 'hex');
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

export const addStudentCardDetails = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phone, address, city, state, zip } = req.body;
    const userId = req.user?._id;

    if ([firstName, lastName, email, phone, address, city, state, zip].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Please fill all the fields");
    }

    const existingUser = await StudentCredit.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, "Card for this owner already exists");
    }

    const generateUniqueCardNumber = async () => {
        let cardNumber;
        let isUnique = false;

        while (!isUnique) {
            cardNumber = Math.ceil(Math.random() * 10000000000000000).toString().padStart(16, '0');
            const existingCard = await StudentCredit.findOne({ cardNumber });
            if (!existingCard) {
                isUnique = true;
            }
        }

        return cardNumber;
    };
    const cardNumber = await generateUniqueCardNumber();

    const generateUniqueCVV = () => {
        return Math.ceil(Math.random() * 1000).toString(); // Generates a 3-digit CVV
    };
    const cvv = generateUniqueCVV();

    try {
        const studentCredit = await StudentCredit.create({
            firstName,
            lastName,
            cardNumber: cardNumber,
            user: userId,
            cvv,
            email,
            phone,
            address,
            city,
            state,
            zipCode: zip
        });
        return res.status(201).json(new ApiResponse(201, studentCredit, "Card details added"));
    } catch (error) {
        throw new ApiError(500, error?.message);
    }
});

export const getStudentCardDetails = asyncHandler(async(req,res)=>{
    const {studentId} = req.params;
    if(!studentId){
        throw new ApiError(400,"Student Id not found");
    }

    const studentDetails = await StudentCredit.aggregate([
        {
            $match : {_id : new mongoose.Types.ObjectId(studentId)}
        },
        {
            $lookup : {
                from : "users",
                localField : "user",
                foreignField : "_id",
                as : "studentDetails"
            }
        },
        {
            $unwind : "$studentDetails",
        }
    ])
    if (studentDetails.length === 0) {
        throw new ApiError(404, "Student not found");
    }
    console.log(studentDetails);
    studentDetails[0].cvv = decrypt(studentDetails[0].cvv);
    return res.status(200).json(new ApiResponse(200, studentDetails[0], "Student all details fetched"))
})
