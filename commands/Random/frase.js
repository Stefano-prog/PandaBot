const {SlashCommandBuilder} = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('frase')
        .setDescription('Show phrases'),
    async execute(interaction) {
        try {
        
        //Petition to the API
        const response = await axios.get('https://magicloops.dev/api/loop/da66363d-3c71-409e-85e7-3d6b0a0a843b/run?input=Hello+World');
        const phrase = response.data.phrase;

        // Respond with the phrase
        await interaction.reply(`Me gustaría decirte que...\n ${phrase}🎋🐼`);
    }catch(error) {
        console.error('Error al obtener la frase:', error);
        await interaction.reply('❌ ¡No pude cargar la frase! Prueba de nuevo.');
        }
    }
}

