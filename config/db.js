const mongoose = require("mongoose");

//Define the MongoDB connection URL
const mongoURL = "mongodb://127.0.0.1:27017/bookDB";

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// get the default connection
// Mongoose maintains a default connections object representing the mongoDB connections
const db = mongoose.connection;

//Define event listeners for database connections

db.on("connected", () => {
  console.log("Connected to MongoDB server");
});

db.on("error", () => {
  console.log("MongoDB connections Error");
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

module.exports = db;
