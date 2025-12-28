const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('install') // Nombre del comando
        .setDescription('Muestra enlaces a juegos') // Descripción
        .addStringOption(option => 
            option.setName('option') // Nombre de la opción
                .setDescription('Selecciona un juego')
                .setRequired(true) // Obligatorio
                .addChoices( // Opciones predefinidas, deben ser agregadas a la lista de comandos en deploy-command.js
                    { name: 'Minecraft', value: 'minecraft' },
                    { name: 'Valorant', value: 'valorant' },
                    { name: 'League of Legend', value: 'leagueoflegend' }
                )),
    async execute(interaction) {
        try {
            const option = interaction.options.getString('option');

            // Usamos switch para mejor legibilidad
            switch(option) {
                case 'minecraft':
                    await interaction.reply('To install Minecraft use => https://tlauncher.org');
                    break;
                case 'valorant':
                    await interaction.reply('To install Valorant use => https://playvalorant.com/es-mx/');
                    break;
                case 'leagueoflegend':
                    await interaction.reply('To install League of Legends use => https://www.leagueoflegends.com/es-es/');
                    break;
                default:
                    // Este caso no debería ocurrir gracias a .addChoices()
                    await interaction.reply('❌ ¡Ups! Algo salió mal. Usa el menú para seleccionar un juego.');
            }
        } catch (error) {
            console.error('Error en el comando /play:', error);
            await interaction.reply('❌ ¡Vaya! Hubo un error. Inténtalo de nuevo más tarde.');
        }
    }
};