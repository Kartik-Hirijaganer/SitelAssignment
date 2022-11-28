const { URL } = require('../util/constant');

/** Connect to database */
const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        const dbConnect = await mongoose.connect(
            URL,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        console.log(`MONGO DB CONNECTED :${dbConnect.connection.host}`);
    } catch (error) {
        console.log({
            messgae: `Failed to connect to database`,
            error
        });
    }

}
module.exports = connectDB;