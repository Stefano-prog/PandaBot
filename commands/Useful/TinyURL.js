const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const axios = require('axios');



module.exports = {
    data: new SlashCommandBuilder()
            .setName('short_url')
            .setDescription('Reduce el tamaño de una URL!')
            .addStringOption(option =>
                option.setName('url')
                .setDescription('URL')
                .setRequired(true)),

    async execute (interaction){
        //Manejo de errores
        try{
            //Obtenemos la URL
            const userURL = interaction.options.getString('url');
            //Llamamos a la API
            const shorcutAPI = `https://is.gd/create.php?format=json&url=${userURL}`;
            //Obtenemos los datos
            const response = await axios.get(shorcutAPI);
            const data = response.data;

            const validURL = data.errormessage === true;


            const embed = new EmbedBuilder()
            .setTitle('URL Cortado')
            .setDescription(validURL ? 'Error con la URL' : data.shorturl)
            .setColor(validURL ? 0xFF0000 : 0x00FF00)
        
            await interaction.reply({embeds: [embed]})
        }
        catch(error){
            console.error(error)
        }
    }
}
