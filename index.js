import express from 'express'
import connectDB from './Config/db.js'
import dotenv from 'dotenv'
import userRoute from './Routes/userRoute.js'
import postRoute from './Routes/postRoute.js'
import cookieParser from 'cookie-parser'

const app = express()
dotenv.config()
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)


const PORT = process.env.PORT
app.listen(PORT, console.log(`Server running on ${PORT}`))