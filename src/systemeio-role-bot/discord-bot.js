const { Client, Intents } = require('discord.js');
const database = require('./db-connection');
const utils = require('../common/utils');
const logger = require('../common/logger');

const botToken = process.env.DISCORD_BOT_TOKEN;
const serverId = process.env.DISCORD_SERVER_ID;
const memberRoleId = process.env.DISCORD_MEMBER_ROLE_ID;

function manageUnexpectedError(error, interaction) {
  logger.error(error);
  interaction.reply({ content: 'An unexpected error has occured, please contact an administrator', ephemeral: true });
}

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });

client.on('ready', () => {
  logger.info(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  try {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'link-email') {
      const discordServer = client.guilds.cache.get(serverId);
      if (!discordServer) {
        throw new Error(`Can't find any discord server with id = ${serverId}`);
      }
      const memberRole = discordServer.roles.cache.find((r) => r.id === memberRoleId);
      if (!memberRole) {
        throw new Error(`Can't find any role with id = ${memberRoleId} on '${discordServer.name}' server`);
      }

      const email = interaction.options.get('email').value;
      const discordId = interaction.user.id;

      discordServer.members.fetch()
        .then((members) => {
          const member = members.get(discordId);
          if (!member) {
            throw new Error(`Can't find any user with id = ${discordId} on '${discordServer.name}' server`);
          }

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
                      member.roles.add(memberRole);
                      interaction.reply({ content: 'This email address has been successfully linked to your discord account', ephemeral: true });
                    })
                    .catch((error) => manageUnexpectedError(error, interaction));
                }
              })
              .catch((error) => manageUnexpectedError(error, interaction));
          }
        })
        .catch((error) => manageUnexpectedError(error, interaction));
    }
  } catch (error) {
    manageUnexpectedError(error, interaction);
  }
});

client.login(botToken);
