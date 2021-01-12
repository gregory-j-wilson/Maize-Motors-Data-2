
exports.up = function(knex) {
  
    return knex.schema
        .createTable('commentary', tbl => {
            tbl.increments()
            tbl.integer('user_id').unsigned().references('id').inTable('users')
            tbl.string('book', 255).notNullable()
            tbl.integer('chapter', 255).notNullable()
            tbl.string('commentary').notNullable()
        })
};

exports.down = function(knex) {

    return knex.schema.dropTableIfExists('commentary')
  
};