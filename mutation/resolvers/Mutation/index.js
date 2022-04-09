const user = require("./User");
const profile = require("./Profile");

module.exports = {
  ...user,
  ...profile,
};
