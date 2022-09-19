exports.up = function (knex) {
  return knex.schema
    .createTable("profiles", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable().unique();
      table.string("label").notNullable();
    })
    .then(() => {
      return knex("profiles").insert([
        { name: "commom", label: "Common" },
        { name: "admin", label: "Administrator" },
        { name: "master", label: "Master" },
      ]);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("profiles");
};
