const { SlashCommandBuilder } = require('discord.js');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('music_ai')
        .setDescription('🎵 Obtén playlists de Spotify recomendadas por IA para tu estado de ánimo')
        .addStringOption(option => 
            option.setName('mood')
                .setDescription('¿Cómo te sientes hoy? (ej: feliz, triste, nostálgico)')
                .setRequired(true)),
    async execute(interaction) {
        try {
            await interaction.deferReply();

            // 1. Configurar APIs
            const spotifyApi = new SpotifyWebApi({
                clientId: process.env.SPOTIFY_CLIENT_ID,
                clientSecret: process.env.SPOTIFY_CLIENT_ID_SECRET
            });

            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash-lite" });

            // 2. Obtener token de Spotify
            const token = await spotifyApi.clientCredentialsGrant();
            spotifyApi.setAccessToken(token.body.access_token);

            const mood = interaction.options.getString('mood');

            // 3. Usar IA para generar términos de búsqueda más precisos
            const searchPrompt = `Dame 3 palabras clave específicas para buscar playlists en Spotify 
            que coincidan con el estado de ánimo o lo que quiero hacer "${mood}". 
            Devuélvelas en formato: palabra1,palabra2,palabra3 y si te hago otra pregunta que no sea 
            sobre música, respondeme que solo devuelves canciones`;
            
            const searchTerms = await model.generateContent(searchPrompt);
            const keywords = (await searchTerms.response).text().trim().split(',');

            // 4. Buscar playlists usando los términos generados por IA
            let playlistUrls = [];
            
            for (const keyword of keywords) {
                const result = await spotifyApi.searchPlaylists(keyword.trim(), { limit: 2 });
                const urls = result.body.playlists.items
                    .filter(playlist => playlist?.external_urls?.spotify)
                    .map(playlist => playlist.external_urls.spotify);
                
                playlistUrls.push(...urls);
            }

            // Eliminar duplicados
            playlistUrls = [...new Set(playlistUrls)].slice(0, 2);

            if (playlistUrls.length === 0) {
                return await interaction.editReply(`❌ No encontré playlists para "${mood}". Prueba con otro estado de ánimo.`);
            }

            // 5. Enviar solo los enlaces
            await interaction.editReply({
                content: `🎧 Playlists recomendadas para "${mood}":\n${playlistUrls.join('\n')}`,
                allowedMentions: { parse: [] }
            });

        } catch (error) {
            console.error('Error:', error);
            await interaction.editReply('❌ Ocurrió un error al buscar playlists. Inténtalo de nuevo.');
        }
    }
}