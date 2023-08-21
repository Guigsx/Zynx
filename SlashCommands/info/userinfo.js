const { ActionRowBuilder, EmbedBuilder, ButtonBuilder } = require("discord.js");
const moment = require('moment-timezone');
require('moment/locale/pt-br');

module.exports = {
    name: "userinfo",
    description: "Veja as informações de um usuário.",
    options: [
        {
            name: 'usuário',
            type: 6,
            description: 'Informe o usuário desejado.',
            required: false
        }
    ],
    run: async (client, interaction) => {
        const user = interaction.options.getUser('usuário') || interaction.user;
        const member = interaction.guild.members.cache.get(user.id);

        const userCreatedAt = moment.tz(user.createdAt, 'UTC').tz('America/Sao_Paulo');
        const joinedAt = moment.tz(member.joinedAt, 'UTC').tz('America/Sao_Paulo');
        const accountAge = moment.duration(moment().diff(userCreatedAt));

        const accountAgeFormatted = accountAge.locale('pt-br').humanize();
        const joinedAtFormatted = joinedAt.format('LL [às] LT');

        const invites = await interaction.guild.invites.fetch();
        const userInvites = invites.filter((invite) => invite.inviter.id === user.id);
        const inviteCount = userInvites.reduce((count, invite) => count + invite.uses, 0);

        const embed = new EmbedBuilder()
            .setTitle(`${user.username}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, format: "png" }))
            .addFields(
                { name: '🎈Tag do Discord:', value: `\`${user.tag}\``, inline: true },
                { name: '🗝 ID do Discord:', value: `\`${user.id}\``, inline: true },
                { name: '📅 Conta criada há:', value: `${userCreatedAt.format('LL [às] LT')}\n<t:${Math.floor(user.createdAt.getTime() / 1000)}:R>`, inline: true },
                { name: '💌 Convites:', value: inviteCount.toString(), inline: true },
                { name: '📥 Entrou no servidor em:', value: `${joinedAtFormatted}\n<t:${Math.floor(member.joinedAt.getTime() / 1000)}:R>`, inline: true },
            );

        interaction.reply({ embeds: [embed] });
    }
};