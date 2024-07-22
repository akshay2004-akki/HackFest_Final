import dotenv from 'dotenv'
import connectDB from './db/index.js'
import app from './app.js'
dotenv.config({
    path: './.env'
})

connectDB()
.then(()=>{
    app.on("error", (err)=>{
        console.error("error occured database connection failed", err)
    })
    app.listen(process.env.PORT, ()=>{
        
    })
})
.catch((err)=>{
    console.error("connection to database failed ", err)
})