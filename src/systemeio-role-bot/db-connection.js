const { Pool } = require('pg');
const camelCase = require('camelcase-keys');
const logger = require('../common/logger');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

function getCustomerByEmail(email) {
  const query = `select * from customer where email = '${email}';`;
  return pool.query(query)
    .then((results) => {
      if (results) {
        return camelCase(results.rows[0]);
      }
      return null;
    })
    .catch((error) => {
      if (error) {
        throw error;
      }
    });
}

function saveNewCustomerEmail(email) {
  const query = `insert into customer (email, update_date) values ('${email}', now());`;
  return pool.query(query)
    .catch((error) => {
      if (error) {
        if (error.code === '23505') {
          logger.error('Email already exists');
        } else {
          throw error;
        }
      }
    });
}

function updateCustomerDiscordId(email, discordId) {
  const query = `update customer set discord_id = '${discordId}', update_date = now() where email = '${email}';`;
  return pool.query(query)
    .catch((error) => {
      if (error) {
        throw error;
      }
    });
}

module.exports = { getCustomerByEmail, saveNewCustomerEmail, updateCustomerDiscordId };

process.on('SIGTERM', () => {
  pool.end();
  logger.info('Database pool shut down');
});
