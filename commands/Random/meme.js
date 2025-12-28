const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Muestra un meme aleatorio de Imgflip 🎭'),
    async execute(interaction) {
        try {
            // Hacer petición a la API de Imgflip
            const response = await axios.get('https://api.imgflip.com/get_memes');
            const memes = response.data.data.memes;
            
            // Seleccionar un meme aleatorio
            const randomMeme = memes[Math.floor(Math.random() * memes.length)];
            
            // Responder con el meme
            await interaction.reply(randomMeme.url);
        } catch (error) {
            console.error('Error al obtener el meme:', error);
            await interaction.reply('❌ ¡No pude cargar el meme! Prueba de nuevo.');
        }
    }
};