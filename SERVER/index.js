const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const test = require('dotenv').config();
const password = process.env.REACT_APP_MONGOOS_PASSWORD;
const secretKey = process.env.REACT_APP_SECRET_KEY;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter)
app.use("/users", userRouter)


// Connect to MongoDB
// DONT MISUSE THIS THANKYOU!!
const connection_string =
  "mongodb+srv://shaheeneallamaiqbal:" +
  password +
  "@cluster0.uyeyspi.mongodb.net/";

mongoose.connect(
  connection_string,
  { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" }
);

app.listen(3000, () => console.log('Server running on port 3000'));

