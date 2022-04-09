const { users, profiles } = require("../../data/db");

module.exports = {
  users() {
    console.log(users);
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
