const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

const myEnv = dotenv.config();
dotenvExpand.expand(myEnv);

require('./http-server');
require('./db-connection');
require('../common/discord-commands');
require('./discord-bot');
