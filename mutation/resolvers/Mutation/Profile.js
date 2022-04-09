const { profiles, nextProfileId } = require("../../data/db");

module.exports = {
  newProfile(_, { name }) {
    const profileExists = profiles.some((profile) => profile.name === name);
    if (profileExists)
      throw new Error("There is already a profile with this name.");

    const profile = {
      name,
      id: nextProfileId(),
    };

    profiles.push(profile);
    return profile;
  },

  deleteProfile(_, { id }) {
    const i = profiles.findIndex((profile) => profile.id === id);

    if (i < 0) return null;

    const excluded = profiles.splice(i, 1);
    return excluded[0] || null;
  },

  updateProfile(_, { id, name }) {
    const i = profiles.findIndex((profile) => profile.id === id);
    if (i < 0) return null;

    profiles[i].name = name;
    return profiles[i];
  },
};
