const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const path = require('path');

const myEnv = dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenvExpand.expand(myEnv);

require('./http-server');
require('./db-connection');
require('../common/discord-commands');
require('./discord-bot');
