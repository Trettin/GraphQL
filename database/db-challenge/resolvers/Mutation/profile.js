const db = require("../../config/db");
const { profile } = require("../Query/profile");

module.exports = {
  async newProfile(_, { data }) {
    try {
      if (!data || !data.name || !data.label)
        throw new Error("Please send a Name and Label for the Profile.");

      const { name } = data;

      const profileExist = await profile(_, { filter: { name } });
      if (profileExist) {
        throw new Error("Duplicated Profile name. Please choose another name.");
      }

      await db("profiles").insert({ ...data });

      return await profile(_, { filter: { name } });
    } catch (error) {
      throw new Error(error);
    }
  },

  async deleteProfile(_, { filter }) {
    // implementar
  },
  async updateProfile(_, { filter, data }) {
    // implementar
  },
};
