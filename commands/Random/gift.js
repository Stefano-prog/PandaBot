const {SlashCommandBuilder} = require('discord.js');
require('dotenv').config();
const axios = require('axios');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('pandagift')
    .setDescription('Que pandabot te de un gift')
    .addStringOption(option => 
        option.setName('buscar')
        .setDescription('Buscar Gift')
        .setRequired(true)),
    

    async execute(interaction){
        try{
        
        // Esperamos respuesta del USUARIO
        await interaction.deferReply();

        /*
        No es necesaria la validación debido a que previamente definimos el .setRequired(true)
        */
        
        const userGift = interaction.options.getString('buscar');

        // Llamada API
        const response = await axios.get(`https://tenor.googleapis.com/v2/search?q=${userGift}&key=${process.env.TENOR_API_KEY}&limit=8`);
        
        const giftSearched = response.data.results;

        if(!giftSearched || giftSearched.length === 0){
            await interaction.editReply(`No se encontraron GIFs para "${userGift}".`)
            return;
        }

        // Seleccionar un GIF aleatorio de los resultados
        const randomIndex = Math.floor(Math.random() * giftSearched.length);
        const randomGif = giftSearched[randomIndex];

        // Enviar la URL del GIF
        await interaction.editReply(randomGif.url);

    }
    catch(error){
        console.error('Error Tenor API', error);    
        await interaction.editReply('❌ Error al buscar GIFs. Intenta más tarde.');

    }
    }  
} 
