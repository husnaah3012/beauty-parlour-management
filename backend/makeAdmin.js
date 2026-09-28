require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./models/User");

const makeAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const email = "hsnbeevi22@gmail.com";

        const user = await User.findOneAndUpdate(
            { email: email },
            { role: "admin" },
            { new: true }
        );

        if (!user) {
            console.log("User not found");
        } else {
            console.log("User is now Admin");
            console.log(user.email);
            console.log(user.role);
        }

        await mongoose.connection.close();

    } catch (error) {
        console.log("Error:", error.message);
    }
};

makeAdmin();