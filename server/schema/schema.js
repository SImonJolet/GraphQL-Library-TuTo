const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })

  //utilisation de fields car multipleTypes en rapport les uns avec les autres
  //explication à venir
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      // quand quelqu'un recher un book, on arrive ici
      type: BookType, //le type de data que on recherche, défini juste au dessus
      agrs: { id: { type: GraphQLString } }, //avec la requête book, je vais récupérer un id
      resolve(parent, args) {
        // à a réception de et ID, on va passer à cette fonction, qui va utiliser l'id et aller chercher le livre lié
        //
        //code to get data from db
        //
      }
    }
  }
});

module.exports = new GraphQLSchema({
  //défini le schéma autorisé à l'user lors de ses requêtes

  //
  //initial RootQuery
  //
  query: RootQuery
});
