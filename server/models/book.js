const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorID: String
  //On ne met pas d'id, alors qu'il est dans schema.js, car mongoDB va crée l'id automatiquement
});

module.exports = mongoose.model("Book", bookSchema);
