const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  # Api entry points!

  scalar Date

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    salary: Float
    vip: Boolean
  }

  type Query {
    hello: String!
    currentHour: Date!
    loggedUser: User!
  }
`;

const resolvers = {
  Query: {
    hello() {
      return "Hello Worl!";
    },
    currentHour() {
      return new Date();
    },
    loggedUser() {
      return {
        id: 1,
        name: "Ana",
        email: "ana@gmail.com",
        age: 28,
        salary: 2000.5,
        vip: true,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Executando em ${url}`);
});
