const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/ecom", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("MongoDB is connected")
    } catch (error) {
        console.error("DB connection error", error)
        process.exit(1)
    }
};

module.exports = connectDB;