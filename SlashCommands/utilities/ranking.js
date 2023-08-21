const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonStyle } = require('discord.js')
const axios = require('axios')
module.exports = {
    name: 'ranking',
    description: 'Veja os 10 maiores servidores de Mincraft BR.',
    type: 1,

    run: async (client, interaction) => {
        const data = [
            { id: 1, name: 'servidor_1', players: 15 },
            { id: 2, name: 'servidor_2', players: 20 },
            { id: 3, name: 'servidor_3', players: 25 },
            { id: 4, name: 'servidor_4', players: 30 },
            { id: 5, name: 'servidor_5', players: 35 },
            { id: 6, name: 'servidor_6', players: 40 },
            { id: 7, name: 'servidor_7', players: 45 },
            { id: 8, name: 'servidor_8', players: 50 },
            { id: 9, name: 'servidor_9', players: 55 },
            { id: 10, name: 'servidor_10', players: 60 },
            { id: 11, name: 'servidor_11', players: 65 },
        ];
        
        data.sort((a, b) => b.players - a.players);
        
        let content = "";
        data.forEach((item, i) => {
            if (i <= 9) {
                content += `${i + 1}. ${item.name} (${item.players} players) \n`;
            }
        });
        
        console.log(content)
        let embed = new EmbedBuilder()
        .setDescription(content)
        interaction.reply({ embeds: [embed] })
        
}
}