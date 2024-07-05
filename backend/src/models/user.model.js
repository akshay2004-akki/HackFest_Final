import mongoose,{Schema} from 'mongoose'
import bcrypt from 'bcrypt'

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

export const User = mongoose.model("User", userSchema);