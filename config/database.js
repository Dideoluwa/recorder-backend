const mongoose = require("mongoose");
require("dotenv").config();

const connectDatabase = () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.DATABASE_PASSWORD}@recorder.sezbjvk.mongodb.net/?retryWrites=true&w=majority&appName=recorder`
    )
    .then(() => {
      console.log("[200] SUCCESS: Database Connected");
    })
    .catch((error) => {
      console.log("[500] FAILED: Database Not Connected"), console.log(error);
    });
};

module.exports = connectDatabase;
