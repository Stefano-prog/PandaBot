const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('encuesta')// Command name
        .setDescription('crea una encuesta!')// Description
        .addStringOption(option =>
            option.setName('pregunta')
            .setDescription('pregunta de la encuesta')
            .setRequired(true)),
        async execute(interaction){
            try{
                
                // El usuario realiza la pregunta y esperamos su respuesta
                const member = interaction.options.getUser('usuario') || interaction.member; 
                const question = interaction.options.getString('Pregunta');
                await interaction.editReply();

                const infoEmbed = new EmbedBuilder()
                    .setTitle(`Encuesta de ${member.username}`) // Quien realizo la encuesta
                    .setDescription(`La pregunta es \n ${question}`) // Pregunta
                    .setColor(0x5865F2) // Color
                    .setTimestamp();// Hora actual
                
                await interaction.reply({embeds: [infoEmbed]});

            }
            catch(error){
                console.error(`Error con el comando encuesta`)
                await interaction.editReply('Error al crear encuesta')
            }
        }
}
