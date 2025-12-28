const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const axios = require('axios');
dotenv = require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clima')
        .setDescription('Muestra el clima de una ciudad')
        .addStringOption(option =>
            option.setName('ciudad')
            .setDescription('Nombre de la ciudad')
            .setRequired(true)),
    async execute(interaction){
        try{
            //Esperar la respuesta del usuario
            const ciudad = interaction.options.getString('ciudad');
            //API KEY 
            const apiKey = process.env.WEATHER_API_KEY; // Asegúrate de tener tu API key en un archivo .env
            //Llamada a la API de OpenWeatherMap
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}`)
            //Datos que obtendremos de la API
            const {name,weather,main} = response.data;
            // Convertir la temperatura de Kelvin a Celsius
            const calctemp = (main.temp - 273.15);
            const temp = calctemp.toFixed(2) // Convertir de Kelvin a Celsius

            // Embed para mostrar el clima con un formato amigable
            const embed = new EmbedBuilder()
                .setTitle(`Clima en ${name}`) 
                .setColor(0x3498db)
                .addFields(
                    {name:'Temperatura', value: `${temp}°C`, inline:true},
                    {name:'Clima', value: `${weather[0].main}`, inline:true},
                )
                .setFooter({text:'Datos obtenidos de OpenWeatherMap'})
                .setTimestamp();
            
            await interaction.reply({embeds: [embed]});

        }
        catch (error) {
            console.error('Error al obtener el clima:', error);
            await interaction.reply('❌ ¡Vaya! Hubo un error al obtener el clima. Inténtalo de nuevo más tarde.');
        }
    }
}