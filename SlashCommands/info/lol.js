const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'lol',
    description: 'Veja as informações de um jogador de League Of Legends',
    type: 1,
    options: [
        {
            name: 'nick',
            description: 'Digite o nick do jogador.',
            type: 3,
            required: true
        }
    ],
    run: async (client, interaction) => {
        try {
            const nick = interaction.options.getString('nick');
            const API_KEY = 'RGAPI-fe28056f-8f53-4a07-ba32-5eb7583db6b1';

            try {
                const summonerResponse = await axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nick}?api_key=${API_KEY}`);
                const { name, profileIconId, id: encryptedSummonerId, summonerLevel, accountId } = summonerResponse.data;

                let embed = new EmbedBuilder()
                    .setTitle(`Informações de ${name}`)
                    .setThumbnail(`https://ddragon.leagueoflegends.com/cdn/11.5.1/img/profileicon/${profileIconId}.png`)
                    .addFields(
                        { name: 'Nick:', value: `\`${name}\``, inline: true },
                        { name: 'Nível:', value: `\`${summonerLevel}\``, inline: true },
                    );

                try {
                    const leagueResponse = await axios.get(`https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedSummonerId}?api_key=${API_KEY}`);
                    const soloDuoInfo = leagueResponse.data.find(entry => entry.queueType === 'RANKED_SOLO_5x5');

                    if (soloDuoInfo) {
                        const { wins, losses, tier, rank, leaguePoints: lp } = soloDuoInfo;
                        const wr = (wins * 100) / (wins + losses);

                        embed = embed.addFields(
                            { name: 'Elo:', value: `\`${tier} ${rank}\``, inline: true },
                            { name: 'PDLs:', value: `\`${lp}\``, inline: true },
                            { name: 'V/D:', value: `\`${wins} / ${losses}\``, inline: true },
                            { name: 'WinRate:', value: `\`${wr.toFixed(0)}%\``, inline: true }
                        );
                    } else {
                        embed = embed.setDescription('O jogador não possui informações em partidas Solo/Duo.');
                    }

                    interaction.reply({ embeds: [embed] });
                } catch (leagueError) {
                    console.error(leagueError);
                    embed = embed.setDescription('Ocorreu um erro ao obter as informações da liga. Por favor, tente novamente mais tarde.');
                    interaction.reply({ embeds: [embed] });
                }
            } catch (summonerError) {
                console.error(summonerError);
                embed = embed.setDescription('Ocorreu um erro ao obter as informações do jogador. Verifique se o nick está correto e tente novamente.');
                interaction.reply({ embeds: [embed] });
            }
        } catch (error) {
            console.error(error);
            const embed = new EmbedBuilder().setDescription('Ocorreu um erro ao processar o comando. Por favor, tente novamente mais tarde.');
            interaction.reply({ embeds: [embed] });
        }
    }
};