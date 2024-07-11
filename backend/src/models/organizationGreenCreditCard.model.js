import mongoose, { Schema } from "mongoose";

const organizationSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: true,
  },
  cardNumber : {
    type : Number,
    required : true
  },
  // cardExpiry : {
  //   type : Date,
  //   // required : true
  // },
  cvv : {
    type : Number,
    // required : true
  },
  contactPerson: {
    type: Schema.Types.ObjectId,
    ref : "User",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  taxId: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });

export const Organization = mongoose.model('Organization', organizationSchema);


