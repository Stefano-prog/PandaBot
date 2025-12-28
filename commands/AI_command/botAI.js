const {SlashCommandBuilder} = require('discord.js');
require('dotenv').config();
const {GoogleGenerativeAI} = require("@google/generative-ai");


module.exports = {
    data : new SlashCommandBuilder()
        .setName('pandai')
        .setDescription('Ask to the AI from Discord!!')
        .addStringOption(option => 
            option.setName('question')
            .setDescription('Cuál es tu mood?')
            .setRequired(true)),
    async execute(interaction){
        const AI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = AI.getGenerativeModel({ 
            model: "gemini-2.5-flash", // Más rápido y económico
            generationConfig: {
                temperature: 0.7
            }
        });
        try{
            await interaction.deferReply();
            const question = interaction.options.getString('question');
            const prompt = `${question}, responde esto en menos de 2000 caracteres, por favor.`;

            if(!prompt){
                throw new Error('El prompt no puede estar vacio');
            }

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            await interaction.editReply(text);

            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply(text);
            }else if (interaction.deferred){
                await interaction.editReply(text);
}
        }
        catch (error) {
            console.error('Error al obtener la respuesta:', error);
            await interaction.reply('❌ ¡Vaya! Hubo un error al obtener la respuesta. Inténtalo de nuevo más tarde.');
        }
    }
}