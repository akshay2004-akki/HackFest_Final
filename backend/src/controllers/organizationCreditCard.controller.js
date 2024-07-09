import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Organization } from "../models/organizationGreenCreditCard.model.js";
import mongoose from "mongoose";


export const addCardDetails = asyncHandler(async (req, res) => {
    const { organizationName, email, phone, address, city, state, zip, taxId } = req.body;
    const contactPerson = req.user?._id

    if (!(organizationName && email && phone && address && city && state && zip && taxId)) {
        throw new ApiError(400, "Please fill the full form");
    }

    const existingOrganization = await Organization.findOne({
        $or: [{ email }, { taxId }]
    });

    if (existingOrganization) {
        throw new ApiError(400, "Organization already exists");
    }

    const generateUniqueCardNumber = async () => {
      let cardNumber;
      let isUnique = false;
  
      while (!isUnique) {
        cardNumber = Math.ceil(Math.random() * 10000000000000000);
        const existingCard = await Organization.findOne({ cardNumber });
        if (!existingCard) {
          isUnique = true;
        }
      }
  
      return cardNumber;
    }
  
    const cardNumber = await generateUniqueCardNumber();


    const newOrganization = await Organization.create({
      organizationName,
      contactPerson ,
      cardNumber,
      email,
      phone,
      address,
      city,
      state,
      zip,
      taxId,
    })

    return res.status(200).json(new ApiResponse(200,newOrganization,"Organization added"))

    
});

export const getOrganizationDetails = asyncHandler(async (req, res) => {
    const { organizationId } = req.params;
  
    const organization = await Organization.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(organizationId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'contactPerson',
          foreignField: '_id',
          as: 'contactPersonDetails'
        }
      },
      { $unwind: '$contactPersonDetails' }
    ]);
    console.log(organization);
    if (!organization.length) {
      throw new ApiError(404, "Organization not found");
    }
  
    return res.status(200).json(new ApiResponse(200, organization[0], "Organization details retrieved"));
  });