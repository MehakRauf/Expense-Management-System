const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Server is listening the db at: ${mongoose.connection.host}`);
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;