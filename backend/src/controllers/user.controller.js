import asyncHandler from "../utils/asyncHandler.js";
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { User } from "../models/user.model.js";

export const registerUser = asyncHandler(async(req,res)=>{
    const {username, email, password, role} = req.body;

    if (
        [email, username, password, role].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.findOne({
        $or : [{username},{email}]
    })
    if(existingUser){
        throw new ApiError(404,"User already exist")
    }
    const user = await User.create({
        username,
        email,
        password,
        role
    })
    const createdUser = await User.findById(user?._id).select("-password -refreshToken")
    console.log("Created User:", user);
    return res.status(201).json(new ApiResponse(200, createdUser, "User Regstered successfully"))
})