import mongoose,{Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'
import jwt from 'jsonwebtoken'


const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long']
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email']
      },
      password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long']
      },
      role: {
        type: String,
        enum: ['student', 'organization'],
        required: [true, 'Role is required']
      },
      creditScore : {
        type:Number,
        default : 0
      },
      tasksCompleted: {
        type: [Boolean],
        default: new Array(30).fill(false)
      },
      uploadedImages: {
        type: [String],
        default: new Array(30).fill(null)
      },
      refreshToken : {
        type:String,

      }
},{timestamps:true})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next();
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.getAccessToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            role : this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
    console.log("Generated Access Token:", token);
    return token;
}

userSchema.methods.getRefreshToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
            role : this.role
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
    console.log("Generated Refresh Token:", token);
    return token;
}

export const User = mongoose.model("User", userSchema);