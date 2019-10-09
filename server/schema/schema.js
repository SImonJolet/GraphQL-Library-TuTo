const graphql = require("graphql");
const lodash = require("lodash");

const Book = require("../models/book");
const Author = require("../models/author");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

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
        //return lodash.find(authors, { id: parent.authorId });
      }
    }
  })

  //utilisation de fields car multipleTypes en rapport les uns avec les autres.
  //On met une fonction pour pouvoir appeller cette const avant, c'est surtout utile pour l'instant pour  authorType
});

//Schema pour les authors

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //return lodash.filter(Books, { authorId: parent.id });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    //sortie books avec possibilité liaison auteur
    book: {
      // quand quelqu'un recher un book, on arrive ici
      type: BookType, //le type de data que on recherche, défini juste au dessus
      args: { id: { type: GraphQLID } }, //avec la requête book, je vais récupérer un id
      resolve(parent, args) {
        // à a réception de et ID, on va passer à cette fonction, qui va utiliser l'id et aller chercher le livre lié
        //
        //code to get data from db
        //return lodash.find(Books, { id: args.id });
        //
      }
    },

    //Sortie author avec pôssibilité liaison livre
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return lodash.find(authors, { id: args.id });
      }
    },

    //Listage des tous les auteurs
    authors: {
      type: new GraphQLList(AuthorType),

      resolve(parent, args) {
        return authors;
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Books;
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        let author = new Author({
          //appel de Author importé depuis "../models/author"
          name: args.name,
          age: args.age
        });
        return author.save(); //sauvegarde dans la DataBase et on la retourne pour afficher ce qu'on vient de pusher
      }
    }
  }
});

module.exports = new GraphQLSchema({
  //défini le schéma autorisé à l'user lors de ses requêtes

  //
  //initial RootQuery
  //
  query: RootQuery, //passage des Query's
  mutation: Mutation //passage des Mutations
});
