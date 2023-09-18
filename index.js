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

client.on('interactionCreate', interaction => {
    if (interaction.customId === 'calculator') {
        const response_1 = Number(interaction.fields.getTextInputValue('calculator#1'));
        const response_2 = Number(interaction.fields.getTextInputValue('calculator#2'));
        const response_3 = Number(interaction.fields.getTextInputValue('calculator#3'));
        const response_4 = Number(interaction.fields.getTextInputValue('calculator#4')) / 100;

        if (isNaN(response_1) || isNaN(response_2) || isNaN(response_3) || isNaN(response_4)) {
            interaction.reply({ content: 'Por favor, forneça valores numéricos válidos.', ephemeral: true });
            return;
        }

        const resultado = response_1 * Math.pow(1 + response_4, response_3) + response_2 * ((Math.pow(1 + response_4, response_3) - 1) / response_4);
        const investido = response_1 + response_2 * response_3;
        const totalinvestido = resultado - investido;

        const embed = new EmbedBuilder()
            .setTitle('Calculadora de juros compostos')
            .addFields(
                { name: 'Investimento inicial:', value: `\`\`\`${response_1.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\`\`\``, inline: false },
                { name: 'Investimento mensal:', value: `\`\`\`${response_2.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\`\`\``, inline: false },
                { name: 'Tempo do investimento:', value: `\`\`\`${response_3} meses\`\`\``, inline: false },
                { name: 'Juros:', value: `\`\`\`${(response_4 * 100).toFixed(2)}% ao mês\`\`\``, inline: false },
                { name: 'Valor Total Final:', value: `\`\`\`${resultado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\`\`\``, inline: true },
                { name: 'Valor Total Investido:', value: `\`\`\`${investido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\`\`\``, inline: true },
                { name: 'Valor Total em Juros:', value: `\`\`\`${totalinvestido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\`\`\``, inline: true },
            );

        interaction.reply({ embeds: [embed], ephemeral: true });
    }
})

client.login(config.TOKEN);