const { ActionRowBuilder, EmbedBuilder, ButtonBuilder } = require("discord.js");
const moment = require('moment-timezone');
require('moment/locale/pt-br');

module.exports = {
    name: "serverinfo",
    description: "Veja as informações do servidor.",
    run: async (client, interaction) => {
        const guild = interaction.guild;
        const owner = await guild.fetchOwner();

        const createdAt = moment.tz(guild.createdAt, 'UTC').tz('America/Sao_Paulo');
        const serverAge = moment.duration(moment().diff(createdAt));

        const serverAgeFormatted = serverAge.locale('pt-br').humanize();

        const invite = await interaction.channel.createInvite({ maxAge: 0, maxUses: 0 });

        let emojis = guild.emojis.cache.size > 0 ? guild.emojis.cache.map((emoji) => emoji.toString()).join(' ') : 'Sem emojis especiais nesse servidor.';

        const embed = new EmbedBuilder()
            .setTitle(`${guild.name}`)
            .setThumbnail(guild.iconURL({ dynamic: true, format: "png" }))
            .addFields(
                { name: '👑 Proprietário do servidor:', value: `\`${owner.user.tag}\` (${owner.user.id})`, inline: true },
                { name: '🗝 ID do servidor:', value: `\`${guild.id}\``, inline: true },
                { name: '📅 Criado em:', value: `${createdAt.format('LL [às] LT')}\n<t:${Math.floor(guild.createdAt.getTime() / 1000)}:R>`, inline: true },
                { name: '👥 Membros:', value: `${guild.memberCount}`, inline: true },
                { name: '📊 Cargos:', value: `${guild.roles.cache.size}`, inline: true },
                { name: '💬 Canais:', value: `${guild.channels.cache.size}`, inline: true },
                { name: '🔗 Convite do Servidor:', value: `\`https://discord.gg/${invite.code}\`` },
                { name: '👾 Emojis do servidor:', value: emojis, inline: true }
            );

        interaction.reply({ embeds: [embed] });
    }
};