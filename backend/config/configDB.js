const mongoose = require("mongoose")

const connectionDB = async () => {
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log("DATABASE CONNECTED SUCCESSFULLY!")
    }
    catch(error){
        console.log("DATABASE CONNECTION ERRO "+error.message)
    }
}

module.exports = connectionDB