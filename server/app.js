const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");

const schema = require("./schema/schema");

const app = express();
//connect to mLab DataBase (/!\, connection down for Simon, to be resolved)
mongoose
  .connect
  //connection string from the database, à voir sur le site de mlab
  // /!\ à bien modifier la partie user et la partie password, voir le tuto16, min 4:40
  ();
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log("now listening for request on port 4000");
});
