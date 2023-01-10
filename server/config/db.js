const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database is connected 🚀🚀")
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDb;