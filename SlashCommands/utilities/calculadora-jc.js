const { ActionRowBuilder, EmbedBuilder, ButtonBuilder, ModalBuilder, ButtonStyle, TextInputBuilder, TextInputStyle } = require("discord.js");

module.exports = {
    name: "calculadora-juros-compostos",
    description: "Calculadora de juros compostos.",
    type: 1,

    run: async (client, interaction) => {
        const modal = new ModalBuilder()
            .setCustomId('calculator')
            .setTitle('Calculadora juros compostos.');

        const inicial = new TextInputBuilder()
            .setCustomId('calculator#1')
            .setLabel('Investimento inicial?')
            .setStyle(TextInputStyle.Short)
            .setValue('100')
        const mensal = new TextInputBuilder()
            .setCustomId('calculator#2')
            .setLabel('Investimento mensal?')
            .setStyle(TextInputStyle.Short)
            .setValue('100')
        const tempo = new TextInputBuilder()
            .setCustomId('calculator#3')
            .setLabel('Qual o tempo do investimento? (Meses)')
            .setStyle(TextInputStyle.Short)
            .setValue('12')
        const juros = new TextInputBuilder()
            .setCustomId('calculator#4')
            .setLabel('Qual o juros do investimento? (Mensal)')
            .setStyle(TextInputStyle.Short)
            .setValue('1')

        const primeiro = new ActionRowBuilder().addComponents(inicial);
        const segundo = new ActionRowBuilder().addComponents(mensal);
        const terceiro = new ActionRowBuilder().addComponents(tempo);
        const quarto = new ActionRowBuilder().addComponents(juros);
        modal.addComponents(primeiro, segundo, terceiro, quarto);
        
        interaction.showModal(modal);
    }
}