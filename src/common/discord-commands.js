const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const logger = require('./logger');

const appId = process.env.DISCORD_APP_ID;
const botToken = process.env.DISCORD_BOT_TOKEN;

const discordAdminPerm = 0x0000000000000008;
const commands = [
  {
    type: 1,
    name: 'link-email',
    description: 'Link your email address to your discord account',
    options: [
      {
        type: 3,
        name: 'email',
        description: 'Your email address',
        required: true,
      },
    ],
  },
  {
    type: 1,
    name: 'add-email',
    description: 'Add an email address (admin only)',
    options: [
      {
        type: 3,
        name: 'email',
        description: 'The email address to add',
        required: true,
      },
    ],
    default_member_permissions: discordAdminPerm,
  },
];

const rest = new REST({ version: '9' }).setToken(botToken);

(async () => {
  try {
    logger.info('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(appId),
      { body: commands },
    );

    logger.info('Successfully reloaded application (/) commands.');
  } catch (error) {
    logger.error(error);
  }
})();
