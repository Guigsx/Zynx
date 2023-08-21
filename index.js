const Discord = require("discord.js");
const fs = require('fs');
const { Client, Intents, GatewayIntentBits, ActivityType, PermissionFlagsBits } = require('discord.js')
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, Events, ModalBuilder, ButtonStyle, TextInputBuilder, TextInputStyle, StringSelectMenuBuilder } = require('discord.js')
const axios = require('axios');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
})

const config = require("./config.json");

client.commands = new Discord.Collection();
client.slashCommands = new Discord.Collection();

require("./handler")(client);
const { glob } = require("glob");
const { promisify } = require("util");
const { channel } = require("diagnostics_channel");
const { arch } = require("os");

const globPromise = promisify(glob);

client.on("interactionCreate", async (interaction) => {
    if (!interaction.guild) return;

    if (interaction.isCommand()) {

        const cmd = client.slashCommands.get(interaction.commandName);

        if (!cmd)
            return;

        const args = [];

        for (let option of interaction.options.data) {

            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }

        cmd.run(client, interaction, args);
    }

    if (interaction.isContextMenuCommand()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);

    }
})


client.once('ready', async () => {
    console.log('✔ Online!')
})

client.on('messageCreate', msg => {
    const inv = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi;
    if (inv.exec(msg.content)) {
        if (!msg.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            msg.delete()
            console.log(`🚫 ${msg.author.tag} tentou enviar um convite. Convite bloqueado.`)
        }
    }
})

client.login(config.TOKEN);