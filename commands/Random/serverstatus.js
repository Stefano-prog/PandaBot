const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const axios = require('axios');

module.exports = {
    data : new SlashCommandBuilder()
            .setName('serverstatus')
            .setDescription('Muestra el estado del servidor de Minecraft')
            .addStringOption(option => 
                option.setName('ip_address')
                .setDescription('Dirección IP del servidor')
                .setRequired(true)),
    
    async execute (interaction){
        
        // Try y catch para manejo de errores
        try{
            const serverStatus = interaction.options.getString('ip_address');
            //Esperamos la respuesta del usuario
            await interaction.reply();
            
            //URL
            const statusAPI = `https://api.mcsrvstat.us/3/${serverStatus}`;
            
            //Obtenemos los datos
            const response = await axios.get(statusAPI);

            //response.data = contenido
            //De esta manera utilizamos "data.nombre" y no "response.data.nombre"
            //Desempaquetamos el contenido
            const data = response.data;

            //Booleano
            //Solo si se cumple devolvera si esta ONLINE u OFFLINE
            const isOnline = data.online === true;

            const embed = new EmbedBuilder()
                .setTitle('Server Status')
                .setColor(isOnline ? 0x00FF00 : 0xFF0000)
                .setDescription(isOnline ? '✅ **ONLINE**': '❌ **OFFLINE**')
            
            //El bot devuelve la respuesta final
            /*
            interaction.reply(...): El bot responde "Obteniendo estado...". Aquí ya cerraste el ciclo de respuesta inicial.

            interaction.deferReply(...): Intentas "deferir" (posponer) una respuesta que ya enviaste. 
            Esto lanzará un error porque no puedes responder dos veces a la misma interacción. 

            Deferir = "Posponer" o "Aplazar"
            */
            await interaction.editReply({embeds: [embed]});

        }
        catch(error){
            //Nos devuelve el error
            console.error(error)
        }

    }    
}
