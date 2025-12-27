const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/inotebook";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected to MongoDB at", mongoURI);
    mongoose.connection.on("disconnected", () => {
      console.error("MongoDB disconnected. Check local service or network.");
    });
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    throw err;
  }
};

module.exports = connectToMongo;
