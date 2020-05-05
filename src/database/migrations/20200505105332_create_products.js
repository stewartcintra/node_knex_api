
exports.up = function(knex) {
  return knex.schema.createTable('products', function(table) {
      table.string('id').primary();
      table.string('product').notNullable();
      table.string('description').notNullable();
      table.decimal('price').notNullable();
      table.integer('amount').notNullable();
      table.boolean('active').notNullable();
      table.timestamps();

  });
};

exports.down = function(knex) {
    return knex.schema.dropTable('products');
};
