require("dotenv").config();
const mongoose = require("mongoose");
// const mongoURI = process.env.MONGODB_URI;
const mongoURI = 'mongodb://localhost:27017/SMUCT_erp';

const connectToMongo = () => {
  mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => {
      console.log("Connected to MongoDB Successfully");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB", error);
    });
};

module.exports = connectToMongo;
