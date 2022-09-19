exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable().unique();
      table.string("password", 60).notNullable();
      table.boolean("active").notNullable().defaultTo(true);
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .then(() => {
      return knex("users").insert([
        { name: "John Snow", email: "jsnow@company.com", password: "12345678" },
        {
          name: "Jaime Lannister",
          email: "jlann@company.com",
          password: "12345678",
        },
        {
          name: "Gabriela T. Nunes",
          email: "gtnunes@company.com",
          password: "12345678",
        },
      ]);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
