// Update with your config settings.

module.exports = {
  client: "mysql",
  connection: {
    database: "challenge-chapter-04",
    user: "root",
    password: "Eunao123!",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
