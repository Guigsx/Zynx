const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonStyle } = require('discord.js')
const axios = require('axios')
module.exports = {
    name: 'mcstatus',
    description: 'Veja as informações de um servidor de minecraft.',
    type: 1,
    options: [
        {
            name: `servidor`,
            description: `Digite o ip de um servidor de minecraft.`,
            type: 3,
            required: true
        }],

    run: async (client, interaction) => {
        const ip = interaction.options.getString("servidor");
        try {
            const response = await axios.get(`https://api.mcstatus.io/v2/status/java/${ip}`);
            const embed = new EmbedBuilder()
                .setTitle('Minecraft server status')
                .addFields(
                    { name: '🌐 IP:', value: `\`\`\`${ip}\`\`\``, inline: false },
                    { name: '👾 Jogadores online:', value: `\`\`\`${response.data.players.online}/${response.data.players.max}\`\`\``, inline: false },
                    { name: 'MOTD:', value: `\`\`\`${response.data.motd.clean}\`\`\``, inline: false }
                )
                .setImage(`https://minecraftskinstealer.com/achievement/10/Servidor+Online!/${response.data.players.online}+jogadores+online!`)
            interaction.reply({ embeds: [embed] })
            return
        } catch (error) {
            await interaction.channel.send({ content: "Houve um erro ao procurar por este servidor." }).then((msg) => {
                setTimeout(() => {
                    msg.delete()
                }, 5000)
            })
        }
    }
}