const mongoose = require('mongoose');



// Connect do DB
const connectToDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB sucessfuly connected!")
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = connectToDB;