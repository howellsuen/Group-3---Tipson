exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.integer('user_id').unique();
    table.string('facebook_id');
    table.string('email');
    table.string('password');
    table.string('token_id');
    table.boolean('premium_user');
    table.timestamps(false, true);
  })

    .then(() => {
      return knex.schema.createTable('coupons', (table) => {
        table.increments();
        table.string('coupon_type');
        table.integer('coupon_id');
        table.timestamps(false, true);
      })

    })

    .then(() => {
      return knex.schema.createTable('user_coupons', (table) => {
        table.increments();
        table.integer('user_id');
        table.foreign('user_id').references('user_id');
        table.integer('coupon_id').references('coupons.id');
        table.timestamps(false, true);
      })
    })

    .then(() => {
      return knex.schema.createTable('appointments', (table) => {
        table.increments();
        table.integer('user_id').references('user_id');
        table.string('appointment_ref');
        table.integer('service_id').references('service_id');
        table.timestamps(false, true);
      })
    })

    .then(() => {
      return knex.schema.createTable('services', (table) => {
        table.increments();
        table.string('service_name');
        table.integer('service_id');
        table.foreign('service_id');
        table.string('service_type');
        table.timestamps(false, true);
      })
    })

    .then(() => {
      return knex.schema.createTable('choices', (table) => {
        table.increments();
        table.integer('user_id').references('user_id');
        table.integer('service_id').references('service_id');
        table.integer('choice_id');
        table.timestamps(false, true);
      })
    })

    .then(() => {
      return knex.schema.createTable('payment_record', (table) => {
        table.increments();
        table.integer('user_id').references('user_id');
        table.string('payment_ref');
        table.timestamps(false, true);
      })
    })
};
exports.down = function (knex, Promise) {
  return knex.schema.dropTable('payment_record')

    .then(() => {
      return knex.schema.dropTable('choices');
    })

    .then(() => {
      return knex.schema.dropTable('services');
    })

    .then(() => {
      return knex.schema.dropTable('appointments');
    })

    .then(() => {
      return knex.schema.dropTable('user_coupons');
    })

    .then(() => {
      return knex.schema.dropTable('coupons');
    })

    .then(() => {
      return knex.schema.dropTable('users');
    })
};
