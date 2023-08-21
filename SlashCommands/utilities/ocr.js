const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonStyle } = require('discord.js')
//const { createWorker } = require('tesseract.js');
module.exports = {
    name: 'ocr',
    description: 'TESTE',
    type: 1,
    options: [
        {
            name: 'imagem',
            description: 'TESTANDO',
            type: 3,
            required: true
        }
    ],

    run: async (client, interaction) => {
        //Em teste...
        /*
        const imagem = interaction.options.getString("imagem");
        const worker = await createWorker();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize('https://cdn.discordapp.com/attachments/1102388976045805751/1110225853612306572/8eEGk3hukN6AAAAABJRU5ErkJggg.png');
        console.log(text);
        await worker.terminate();
        const embed = new EmbedBuilder()
            .setDescription(`O texto da imagem é seguinte:\n${text}`)
            .setImage(imagem)
            
        interaction.reply({
            embeds: [embed]
        })
    */
   interaction.reply({content: '🚧 Em manutenção.'})
    }
}