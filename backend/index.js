const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/products");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DBconnect"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.listen(process.env.PORT || 5000, () => {
  console.log("BE server is running !");
});
