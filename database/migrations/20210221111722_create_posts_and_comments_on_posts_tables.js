
exports.up = function(knex) {

    return knex.schema
        .createTable('posts', tbl => {
            tbl.increments()
            tbl.integer('user_id').unsigned().references('id').inTable('users')
            tbl.string('discussion_room', 255).notNullable()
            tbl.text('post', 'longtext').notNullable()
        })

        .createTable('comments_on_posts', tbl => {
            tbl.increments()
            tbl.integer('user_id').unsigned().references('id').inTable('users')
            tbl.integer('post_id').unsigned().references('id').inTable('posts')
            tbl.string('discussion_room', 255).notNullable()
            tbl.text('comment', 'longtext').notNullable()
        })
  
};

exports.down = function(knex) {

    return knex.schema
        .dropTableIfExists('comments_on_posts')
        .dropTableIfExists('posts')    
  
};
