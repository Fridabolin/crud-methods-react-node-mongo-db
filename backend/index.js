const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

//imports routes to be accesed from server
const postRouter = require("./api/blogposts");

//implementation of local .env file
require("dotenv").config();

//middelware (middelware fångar upp requesten av servern & innan den hanteras + respons
// så görs olika "operationer" bla cors som kollar så defaulten håller säkerthetsstandard)
app.use(cors());
app.use(express.json());
app.use("/api", postRouter);

//static folder for serving html
app.use(express.static(path.join(__dirname, "../blogg/build")));

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    autoIndex: true,
  },
  () => console.log("connected to DB")
);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
