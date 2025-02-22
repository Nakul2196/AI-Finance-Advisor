const mongoose = require('mongoose');

const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() =>{
            console.log('DB connected');
        })
        .catch((err) =>{
            console.error('DB connection error:', err.message);
        });
};

module.exports = connectDB;
