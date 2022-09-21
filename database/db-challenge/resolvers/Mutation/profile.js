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
    if (!filter || (!filter.id && !filter.name))
      throw new Error("Please send the Profile Id or Email");

    try {
      const profile_ = await profile(_, { filter });

      if (!profile_)
        throw new Error(
          "This Profile doesn't exist. Please verify the Id or Neme."
        );

      await db("users_profiles").where({ profile_id: profile_.id }).delete();
      await db("profiles").where({ id: profile_.id }).delete();

      return profile_;
    } catch (error) {
      throw new Error(error);
    }
  },
  async updateProfile(_, { filter, data }) {
    if (!filter || (!filter.id && !filter.name))
      throw new Error("Please send the Profile Id or Name");

    try {
      const profile_ = await profile(_, { filter });

      if (!profile_)
        throw new Error(
          "This Profile doesn't exist. Please verify the Id or Neme."
        );

      await db("profiles")
        .where({ id: profile_.id })
        .update({ ...data });

      return await profile(_, { filter: { id: profile_.id } });
    } catch (e) {
      throw new Error(e);
    }
  },
};
