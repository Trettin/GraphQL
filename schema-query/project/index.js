const { ApolloServer, gql } = require("apollo-server");

const users = [
  {
    id: 1,
    name: "João Silva",
    email: "jsilva@zmail.com",
    idade: 29,
  },
  {
    id: 2,
    name: "Rafael Junior",
    email: "rafajun@zmail.com",
    idade: 31,
  },
  {
    id: 3,
    name: "Daniela Smith",
    email: "danismi@zmail.com",
    idade: 24,
  },
];

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

  type Product {
    name: String!
    price: Float!
    discount: Int
    priceWithDiscount: Float
  }
  # Only queries that return a scalar can be called without {brackets}
  type Query {
    hello: String!
    currentHour: Date!
    loggedUser: User!
    highlightedProduct: Product!
    lotteryNumbers: [Int!]!
  }
`;

const resolvers = {
  User: {
    salary(user) {
      return user.salary_in_real;
    },
  },
  Product: {
    priceWithDiscount(product) {
      if (product.discount) {
        return (product.price * ((100 - product.discount) / 100)).toFixed(2);
      } else {
        return product.price;
      }
    },
  },
  // Query is the first entry and the methods have no params
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
        salary_in_real: 2000.5,
        vip: true,
      };
    },
    highlightedProduct() {
      return {
        name: "Ball",
        price: 19.99,
        discount: 15,
      };
    },
    lotteryNumbers() {
      return Array(6)
        .fill()
        .map(() => parseInt(Math.random() * 60 + 1))
        .sort((a, b) => a - b);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Executing in ${url}`);
});
