
exports.up = function(knex) {
  
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments()
            tbl.string('email', 255).notNullable().unique()
            tbl.string('password', 255).notNullable()
        })

        .createTable('cars', tbl => {
            tbl.increments()
            tbl.integer('year', 255).notNullable()
            tbl.string('make', 255).notNullable()
            tbl.string('model', 255).notNullable()
            tbl.integer('mileage', 255).notNullable()
            tbl.string('condition', 255).notNullable()
            tbl.text('profile_pic_url')

        })

};

exports.down = function(knex) {
  
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('cars')



};
