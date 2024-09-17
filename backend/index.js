const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const connectionToDB = require("./config/configDB.js")
const userRoute = require("./routes/User.js")
const courseRoute = require("./routes/Course.js")
const cloudinary = require("cloudinary").v2
dotenv.config()

app.use(cors())
connectionToDB()
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET_KEY,
})
app.use(express.json({limit: '50mb'}));
app.use(cookieParser())
app.use('/api/user',userRoute)
app.use('/api/course',courseRoute)

app.listen(process.env.PORT, () => {
    console.log(`SERVER IS RUNNING AT PORT ${process.env.PORT}`)
})