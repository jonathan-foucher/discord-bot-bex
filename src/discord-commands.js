const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const appId = process.env.DISCORD_APP_ID;
const botToken = process.env.DISCORD_BOT_TOKEN;

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
];

const rest = new REST({ version: '9' }).setToken(botToken);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(appId),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
