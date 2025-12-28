require('dotenv').config(); // Cargar variables de entorno PRIMERO
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

// 1. Validación del token
if (!process.env.TOKEN) {
    console.error('❌ ERROR: No se encontró TOKEN en .env');
    process.exit(1);
}

// 2. Configuración mejorada del cliente
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent // Añadido para leer mensajes
    ]
});

client.commands = new Collection();

// 3. Función mejorada para cargar comandos
const loadCommands = async () => {
    const commandsPath = path.join(__dirname, 'commands');
    
    if (!fs.existsSync(commandsPath)) {
        console.error('❌ No se encontró la carpeta commands/');
        return;
    }

    try {
        const commandFolders = fs.readdirSync(commandsPath);
        
        for (const folder of commandFolders) {
            const folderPath = path.join(commandsPath, folder);
            if (!fs.statSync(folderPath).isDirectory()) continue;

            const commandFiles = fs.readdirSync(folderPath)
                .filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const filePath = path.join(folderPath, file);
                
                try {
                    const command = require(filePath);
                    
                    if (!command.data?.name || !command.execute) {
                        console.warn(`⚠️ Comando inválido en ${filePath}`);
                        continue;
                    }
                    
                    client.commands.set(command.data.name, command);
                    console.log(`✓ Cargado comando: ${command.data.name}`);
                } catch (error) {
                    console.error(`❌ Error al cargar ${file}:`, error.message);
                }
            }
        }
    } catch (error) {
        console.error('💥 Error al cargar comandos:', error.message);
    }
};

// 4. Eventos mejorados
client.once(Events.ClientReady, async readyClient => {
    console.log(`🤖 Conectado como ${readyClient.user.tag}`);
    console.log(`🛠️  Cargando comandos...`);
    await loadCommands();
    console.log(`✅ ${client.commands.size} comandos cargados`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
        console.warn(`Comando no encontrado: ${interaction.commandName}`);
        return;
    }

    try {
        await command.execute(interaction);
        console.log(`Ejecutado: ${interaction.commandName}`);
    } catch (error) {
        console.error(`❌ Error en ${interaction.commandName}:`, error);
        
        const errorMessage = {
            content: '⚠️ Ocurrió un error al ejecutar el comando',
            ephemeral: true
        };

        if (interaction.deferred || interaction.replied) {
            await interaction.editReply(errorMessage).catch(console.error);
        } else {
            await interaction.reply(errorMessage).catch(console.error);
        }
    }
});

// 5. Manejo mejorado de errores
process.on('unhandledRejection', error => {
    console.error('🔥 Error no manejado:', error);
});

process.on('uncaughtException', error => {
    console.error('💥 Excepción no capturada:', error);
});

// 6. Inicio seguro del bot
client.login(process.env.TOKEN)
    .then(() => console.log('🔑 Autenticación exitosa'))
    .catch(error => {
        console.error('❌ Error de autenticación:', error);
        process.exit(1);
    });