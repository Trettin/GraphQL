const { profiles } = require("../data/db");

module.exports = {
  salary(user) {
    return user.salary_in_real;
  },
  profile(user) {
    return profiles.find((profile) => user.profile_id === profile.id);
  },
};
