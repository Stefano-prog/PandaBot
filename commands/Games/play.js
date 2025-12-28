const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('game') // Nombre del comando
        .setDescription('Muestra enlaces a juegos') // Descripción
        .addStringOption(option => 
            option.setName('game') // Nombre de la opción
                .setDescription('Selecciona un juego')
                .setRequired(true) // Obligatorio
                .addChoices( // Opciones predefinidas, deben ser agregadas a la lista de comandos en deploy-command.js
                    { name: 'Make It Meme', value: 'makeitmeme' },
                    { name: 'Bomb Party', value: 'bombparty' },
                    { name: 'Gartic Phone', value: 'garticphone' }
                )),
    async execute(interaction) {
        try {
            const game = interaction.options.getString('game');

            // Usamos switch para mejor legibilidad
            switch(game) {
                case 'makeitmeme':
                    await interaction.reply('🎮 Make It Meme: https://makeitmeme.com/es/');
                    break;
                case 'bombparty':
                    await interaction.reply('💣 Bomb Party: https://jklm.fun');
                    break;
                case 'garticphone':
                    await interaction.reply('📞 Gartic Phone: https://garticphone.com/es');
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