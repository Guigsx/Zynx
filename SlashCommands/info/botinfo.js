const { ActionRowBuilder, EmbedBuilder, ButtonBuilder } = require("discord.js");
const moment = require('moment-timezone');
require('moment/locale/pt-br');

const repoUrl = 'https://github.com/Guigsx/Zynx';

module.exports = {
    name: "botinfo",
    description: "Veja as informações do bot.",
    run: async (client, interaction) => {

        const userCreatedAt = moment.tz(client.user.createdAt, 'UTC').tz('America/Sao_Paulo');

        const embed = new EmbedBuilder()
            .setTitle(`${client.user.username}`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, format: "png" }))
            .setDescription(`
                O **${client.user.username}** é um bot 🇧🇷 brasileiro criado para tornar a sua experiência no Discord muito melhor! Ele tem várias funções, como moderação, diversão, utilidades, e muito mais!

                Atualmente, estou presente em **${client.guilds.cache.size} servidores** e conversando com **${client.users.cache.size} usuários**.

                Desde **${userCreatedAt.format('LL [às] LT')} (<t:${Math.floor(client.user.createdAt.getTime() / 1000)}:R>)**

                Estou online há **<t:${Math.floor(Date.now() / 1000) - Math.floor(process.uptime())}:R>.**

                Fui criado em JavaScript com a biblioteca Discord.js. Caso queira dar uma olhada no meu código fonte, você pode acessar meu repositório no 💻 **[GitHub](${repoUrl})!**

                **Fui desenvolvido por: \`Guigs#9893\`**
            `)

        interaction.reply({ embeds: [embed] });
    }
};