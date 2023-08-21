const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: "moedas",
    description: "Verificar valores das moedas",
    type: 1,

    run: async (client, interaction, args) => {
        try {
            const response = await axios.get(`https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL,ARS-BRL,GBP-BRL,ETH-BRL,CNY-BRL,RUB-BRL`);
            const data = response.data;

            const dolar = formatCurrency(data.USDBRL.ask);
            const euro = formatCurrency(data.EURBRL.ask);
            const pesoArgentino = `R$ ${formatNumber(data.ARSBRL.ask)}`;
            const libras = formatCurrency(data.GBPBRL.ask);
            const btc = formatCurrency(data.BTCBRL.ask);
            const eth = formatCurrency(data.ETHBRL.ask);
            const yuan = formatCurrency(data.CNYBRL.ask);
            const rublo = formatCurrency(data.RUBBRL.ask);

            const embed = new EmbedBuilder()
                .setTitle('Moedas')
                .setDescription('Aqui você pode ver algumas moedas e o valor das mesmas. Esse comando é apenas para se informar.')
                .addFields(
                    { name: '$ Dolar:', value: `\`\`\`${dolar}\`\`\``, inline: true },
                    { name: '€ Euro:', value: `\`\`\`${euro}\`\`\``, inline: true },
                    { name: '🇦🇷 Peso Argentino:', value: `\`\`\`${pesoArgentino}\`\`\``, inline: true },
                    { name: '£ Libra esterlina:', value: `\`\`\`${libras}\`\`\``, inline: true },
                    { name: '¥ Yuan Chinês:', value: `\`\`\`${yuan}\`\`\``, inline: true },
                    { name: '₽ Rublo Russo:', value: `\`\`\`${rublo}\`\`\``, inline: true },
                    { name: '🪙 BitCoin:', value: `\`\`\`${btc}\`\`\``, inline: false },
                    { name: 'ETH:', value: `\`\`\`${eth}\`\`\``, inline: false },
                )
                .setColor("#2F3136");

            interaction.reply({ embeds: [embed] });
        } catch (error) {
            interaction.reply({
                content: `Ocorreu um erro ao processar o comando. Por favor, tente novamente mais tarde.`,
                ephemeral: true
            });
        }
    }
};

function formatCurrency(value) {
    return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatNumber(value) {
    return Number(value).toLocaleString('pt-BR');
}
