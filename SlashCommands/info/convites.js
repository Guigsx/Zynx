const { ActionRowBuilder, EmbedBuilder, ButtonBuilder } = require("discord.js");
const moment = require('moment-timezone');
require('moment/locale/pt-br');

module.exports = {
    name: "convites",
    description: "Veja os convites de um usuário.",
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

        const invites = await interaction.guild.invites.fetch();
        const userInvites = invites.filter((invite) => invite.inviter.id === user.id);
        const inviteCount = userInvites.reduce((count, invite) => count + invite.uses, 0);

        const embed = new EmbedBuilder()
            .setTitle(`${user.username}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, format: "png" }))
            .setDescription(`${user.username}, você tem **${inviteCount.toString()}** convite(s) no momento.\n\n\`Lembrando que apenas convites ativos são contabilizados. Convites limitados ou temporários que expiram não são contabilizados.\``);

        interaction.reply({ embeds: [embed] });
    }
};