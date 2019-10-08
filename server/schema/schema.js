const graphql = require("graphql");
const lodash = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt
} = graphql;

//dummy data
var books = [
  { name: "Harry Potter 1", genre: "Enfant", id: "1", authorId: "1" },
  { name: "Harry Potter 2", genre: "Jeunesse", id: "2", authorId: "2" },
  { name: "Harry POtter 7", genre: "Fantastique", id: "3", authorId: "3" }
];

var authors = [
  { name: "Simon", age: "27", id: "1" },
  { name: "Phil", age: "22", id: "2" },
  { name: "Dydy", age: "18", id: "3" }
];

//Schema pour les books

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        return lodash.find(authors, { id: parent.authorId });
      }
    }
  })

  //utilisation de fields car multipleTypes en rapport les uns avec les autres
  //explication à venir
});

//Schema pour les authors

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      // quand quelqu'un recher un book, on arrive ici
      type: BookType, //le type de data que on recherche, défini juste au dessus
      args: { id: { type: GraphQLID } }, //avec la requête book, je vais récupérer un id
      resolve(parent, args) {
        // à a réception de et ID, on va passer à cette fonction, qui va utiliser l'id et aller chercher le livre lié
        //
        //code to get data from db

        return lodash.find(books, { id: args.id });

        //
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return lodash.find(authors, { id: args.id });
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
