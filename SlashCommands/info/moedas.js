const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonStyle } = require('discord.js')
const axios = require('axios')

module.exports = {
    name: "moedas",
    description: "Quanto ta o dolar hoje?",
    type: 1,

    run: async (client, interaction, args) => {
        axios.get(`https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL`)
            .then(async response => {

                //Atribuição do valor das moedas.
                let valor_dolar = Number(response.data.USDBRL.ask)
                    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

                let valor_euro = Number(response.data.EURBRL.ask)
                    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

                let valor_btc = Number(response.data.BTCBRL.ask)
                    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })


                let embed = new EmbedBuilder()
                    .setTitle('Moedas')
                    .setDescription('Aqui você pode ver algumas moedas e o valor das mesmas. Esse comando é apenas para se informar.')
                    .addFields(
                        { name: '🇺🇲 Dolar:', value: `${valor_dolar}`, inline: true },
                        { name: '🇪🇺 Euro:', value: `${valor_euro}`, inline: true },
                        { name: '🪙 BitCoin:', value: `${valor_btc}`, inline: true },
                    )
                    .setColor("#2F3136")
                interaction.reply({ embeds: [embed] })

            }).catch(error => {
                interaction.reply({
                    content: `***${interaction.user.username},** ocorreu algum erro, sinto muito.*`,
                    ephemeral: true
                })
            })
    }
}