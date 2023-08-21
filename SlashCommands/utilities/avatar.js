const { ActionRowBuilder, EmbedBuilder, ButtonBuilder } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Veja o avatar de um usuário.",
    options: [
        {
            name: 'pessoa',
            type: 6,
            description: 'Informe o usuário desejado.',
            require: false
        },
    ],
    run: async (client, interaction) => {

        let user = interaction.options.getUser('pessoa') || interaction.user;


        const button = new ButtonBuilder()
            .setLabel("Baixar")
            .setStyle(5)
            .setURL(
                user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 })
            );

        const row = new ActionRowBuilder().addComponents(button);

        let avatar = user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 })

        let embed = new EmbedBuilder()
            .setTitle(`Avatar - ${user.tag}`)
            .setImage(avatar)

        interaction.reply({ embeds: [embed], components: [row] })

    }
}