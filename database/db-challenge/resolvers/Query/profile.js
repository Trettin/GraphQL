const db = require("../../config/db");

module.exports = {
  async profiles() {
    return await db("profiles");
  },
  async profile(_, { filter: { id, name } }) {
    if (id && id > 0) {
      return await db("profiles").where({ id }).first();
    } else {
      return await db("profiles").where({ name }).first();
    }
  },
};
