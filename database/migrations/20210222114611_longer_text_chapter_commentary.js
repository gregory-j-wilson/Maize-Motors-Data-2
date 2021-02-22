
exports.up = function(knex) {

    return knex.schema.alterTable('commentary', function(t) {
        t.text('commentary', 'longtext').notNullable().alter();
      });
  
};

exports.down = function(knex) {

 
};
