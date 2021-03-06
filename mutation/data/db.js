let id = 1;
const nextId = () => {
  return id++;
};

let profileId = 1;
const nextProfileId = () => {
  return profileId++;
};

const users = [
  {
    id: nextId(),
    name: "João Silva",
    email: "jsilva@zmail.com",
    age: 29,
    profile_id: 1,
    status: "ACTIVE",
  },
  {
    id: nextId(),
    name: "Rafael Junior",
    email: "rafajun@zmail.com",
    age: 31,
    profile_id: 2,
    status: "INACTIVE",
  },
  {
    id: nextId(),
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
    id: nextProfileId(),
  },
  {
    name: "Adm",
    id: nextProfileId(),
  },
];

module.exports = {
  users,
  profiles,
  nextId,
  nextProfileId,
};
