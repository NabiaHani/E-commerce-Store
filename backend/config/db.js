require('dotenv').config();
const mongoose = require('mongoose');

// mongodb connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Connected to MongoDB ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error in MongoDB ${error}`)
    }
}
module.exports = connectDB;