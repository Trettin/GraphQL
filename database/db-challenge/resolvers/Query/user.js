const db = require("../../config/db");

module.exports = {
  async users() {
    return await db("users");
  },
  async user(_, { filter: { id, email } }) {
    if (!id && !email) return null;
    if (id && id > 0) {
      return await db("users").where({ id }).first();
    } else if (email) {
      return await db("users").where({ email }).first();
    }
  },
};
