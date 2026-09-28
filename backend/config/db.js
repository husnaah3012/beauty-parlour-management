const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully");
        console.log("Host:", mongoose.connection.host);
        console.log("Database:", mongoose.connection.name);
    } catch (err) {
        console.log("MongoDB Connect Failed");
        console.log(err.message);
    }
};

module.exports = connectDB;