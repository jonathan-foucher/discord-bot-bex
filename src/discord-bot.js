const { Client, Intents } = require('discord.js');
const database = require('./db-connection');
const utils = require('./utils');

const botToken = process.env.DISCORD_BOT_TOKEN;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'link-email') {
    const email = interaction.options.get('email').value;
    const discordId = interaction.user.id;

    if (!utils.isEmailValid(email)) {
      interaction.reply({ content: 'You have to use this command with a valid email address', ephemeral: true });
    } else {
      database.getCustomerByEmail(email)
        .then((customer) => {
          if (!customer) {
            interaction.reply({ content: 'We can\'t find your email address in the customer list', ephemeral: true });
          } else if (customer.discordId) {
            if (customer.discordId === discordId) {
              interaction.reply({ content: 'This email address is already linked to your discord account', ephemeral: true });
            } else {
              interaction.reply({ content: 'This email address is already linked to another discord account', ephemeral: true });
            }
          } else {
            database.updateCustomerDiscordId(customer.email, discordId)
              .then(() => {
                interaction.reply({ content: 'This email address has been successfully linked to your discord account', ephemeral: true });
              });
          }
        });
    }
  }
});

client.login(botToken);
