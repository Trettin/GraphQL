const users = [
  {
    id: 1,
    name: "João Silva",
    email: "jsilva@zmail.com",
    age: 29,
    profile_id: 1,
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Rafael Junior",
    email: "rafajun@zmail.com",
    age: 31,
    profile_id: 2,
    status: "INACTIVE",
  },
  {
    id: 3,
    name: "Daniela Smith",
    email: "danismi@zmail.com",
    age: 24,
    profile_id: 1,
    status: "BLOCKED",
  },
];

const profiles = [
  {
    name: "Common",
    id: 1,
  },
  {
    name: "Adm",
    id: 2,
  },
];

module.exports = {
  users,
  profiles,
};
