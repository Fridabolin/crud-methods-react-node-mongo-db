const mongoose = require("mongoose");

//en modell av hur datan ska se ut

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Post", PostSchema);
// mongoose kan inte se vår modell - vi måste göra om den & det gör vi med mongoose.model("Post", PostSchema)
