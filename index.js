const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDatabase = require("./config/database");
const userRouter = require("./routes/user");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(cors());

connectDatabase();

app.use("/api/v1", userRouter);

app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "App is running",
  });
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server Running at 8000`);
});
