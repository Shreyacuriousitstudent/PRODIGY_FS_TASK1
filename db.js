const mongoose = require('mongoose');
require('dotenv').config(); // ✅ Make sure this is at the top

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/users';
        console.log("Connecting to MongoDB:", mongoURI); // 🪵 Debug log
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB connection successful!');
    } catch (err) {
        console.error('❌ MongoDB connection failed:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
