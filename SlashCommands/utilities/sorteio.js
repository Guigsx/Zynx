const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonStyle } = require('discord.js')
const axios = require('axios')

module.exports = {
    name: 'sorteio',
    description: 'Criar um sorteio.',
    type: 1,
    run: async (client, interaction) => {

        const modal = new ModalBuilder()
            .setCustomId('sorteio')
            .setTitle('Configurando o seu sorteio!')

        let item = new TextInputBuilder()
            .setCustomId('item')
            .setLabel("Qual item será sorteado?")
            .setStyle(TextInputStyle.Short)
        let ganhadores = new TextInputBuilder()
            .setCustomId('ganhadores')
            .setLabel("Quantos ganhadores?")
            .setStyle(TextInputStyle.Short)
        let duracao = new TextInputBuilder()
            .setCustomId('duracao')
            .setLabel("Qual a duração do sorteio?")
            .setStyle(TextInputStyle.Short)
        let msg = new TextInputBuilder()
            .setCustomId('msg')
            .setLabel("Qual a mensagem do sorteio?")
            .setStyle(TextInputStyle.Paragraph)

        let primeiro = new ActionRowBuilder().addComponents(item)
        let segundo = new ActionRowBuilder().addComponents(ganhadores)
        let terceiro = new ActionRowBuilder().addComponents(duracao)
        let quarto = new ActionRowBuilder().addComponents(msg)
        modal.addComponents(primeiro, segundo, terceiro, quarto)

        interaction.showModal(modal)
    }
}