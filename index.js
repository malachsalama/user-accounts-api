const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const path = require("path");
require("dotenv").config();
mongoose.set("strictQuery", true);

const routes = require("./routes/routes");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI);

// Serving static files
app.use(express.static("public"));

app.use("/", routes);

app.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
);
