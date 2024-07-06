import asyncHandler from "../utils/asyncHandler.js";
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import { User } from "../models/user.model.js";


const getAccessAndRefreshToken = async (userId)=>{
    const user = await User.findById(userId);
    const accessToken = await user.getAccessToken()
    const refreshToken = await user.getRefreshToken()

    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave : false});

    return {accessToken, refreshToken};
}

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

export const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        throw new ApiError(400,"Fields are missing");
    }

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(404,"User does not exist")
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new ApiError(400,"incorrect Password")
    }


})