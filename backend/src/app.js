import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'

dotenv.config({
    path:"./.env"
})

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended:true, limit:"20kb"}))
app.use(express.static("public"))
app.use(cookieParser())


import userRouter from './routes/user.routes.js'
import orgCardRouter from './routes/organizationCreditCard.routes.js'
import studentCardRouter from './routes/studentCredit.routes.js'
import contactUs from './routes/contactUs.routes.js'

app.use("/api/v3/users", userRouter)
app.use("/api/v3/card", orgCardRouter)
app.use("/api/v3/studentcard", studentCardRouter)
app.use("/api/v3/contactUs", contactUs)

export default app