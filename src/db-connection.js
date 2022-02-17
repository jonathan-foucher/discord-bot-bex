const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

function getClientByEmail(email) {
  const query = `select * from client where email = '${email}';`;
  return pool.query(query)
    .then((results) => {
      if (results) {
        return results.rows[0];
      }
      return null;
    })
    .catch((error) => {
      if (error) {
        throw error;
      }
    });
}

function saveNewClientEmail(email) {
  const query = `insert into client (email, update_date) values ('${email}', now());`;
  return pool.query(query)
    .catch((error) => {
      if (error) {
        if (error.code === '23505') {
          console.error('Email already existing');
        } else {
          throw error;
        }
      }
    });
}

function updateClientDiscordId(email, discordId) {
  const query = `update client set discord_id = '${discordId}', update_date = now() where email = '${email}';`;
  return pool.query(query)
    .catch((error) => {
      if (error) {
        throw error;
      }
    });
}

module.exports = { getClientByEmail, saveNewClientEmail, updateClientDiscordId };

process.on('SIGTERM', () => {
  pool.end();
  console.info('Database pool shut down');
});
