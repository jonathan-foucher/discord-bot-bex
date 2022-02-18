/* eslint-disable camelcase */

exports.shorthands = undefined;

// Create the customer table
exports.up = pgm => {
  pgm.createTable('customer', {
    email: {
      type: 'varchar(254)',
      primaryKey: true,
    },
    discord_id: {
      type: 'varchar(30)',
      notNull: false,
    },
    update_date: {
      type: 'timestamptz',
      notNull: true,
    },
  });
};

exports.down = pgm => {
  pgm.dropTable('customer');
};
