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
      tasks : 
        [
          'Use public transportation instead of driving',
          'Walk or bike for short trips',
          'Carpool or ride-share when possible',
          'Install energy-efficient light bulbs',
          'Use a programmable thermostat',
          'Reduce, reuse, and recycle',
          'Avoid single-use plastics',
          'Use reusable shopping bags',
          'Compost food waste',
          'Purchase energy-efficient appliances',
          'Reduce water usage',
          'Turn off lights when not in use',
          'Unplug electronics when not in use',
          'Wash clothes in cold water',
          'Air-dry clothes instead of using a dryer',
          'Install low-flow showerheads and faucets',
          'Take shorter showers',
          'Use a rain barrel to collect rainwater',
          'Plant trees and native plants',
          'Eat less meat',
          'Buy local and seasonal produce',
          'Reduce paper usage',
          'Opt for digital receipts',
          'Support renewable energy sources',
          'Avoid fast fashion',
          'Use a reusable water bottle',
          'Support green businesses',
          'Upgrade insulation in your home',
          'Use a laptop instead of a desktop computer',
          'Advocate for environmental policies'
      ],
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