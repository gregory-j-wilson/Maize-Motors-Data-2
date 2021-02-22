
exports.up = function(knex) {

    return knex.schema.alterTable('user', function(t) {
        t.text('commentary', 'longtext').notNullable().alter();
      });
  
};

exports.down = function(knex) {

 
};
