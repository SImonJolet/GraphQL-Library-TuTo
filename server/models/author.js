const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema({
  name: String,
  age: Number
  //On ne met pas d'id, alors qu'il est dans schema.js, car mongoDB va crée l'id automatiquement
});

module.exports = mongoose.model("Author", authorSchema);
