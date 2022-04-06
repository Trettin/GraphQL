const { users, profiles } = require("../data/db");

module.exports = {
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
  lotteryNumbers() {
    return Array(6)
      .fill()
      .map(() => parseInt(Math.random() * 60 + 1))
      .sort((a, b) => a - b);
  },
  users() {
    return users;
  },
  // The first param of a resolver inside Query is always null because it is a entry point but if the resolver were not in Query it would be the object that was return by another resolver, the parent resolver.
  user(_, { id }) {
    return users.find((user) => user.id.toString() === id);
  },
  profiles() {
    return profiles;
  },
  profile(_, { id }) {
    return profiles.find((user) => user.id.toString() === id);
  },
};
