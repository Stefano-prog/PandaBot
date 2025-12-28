const {REST, Routes} = require('discord.js');
require('dotenv').config();

// 1. Validación del token
if (!process.env.TOKEN) {
    console.error('❌ ERROR: No se encontró TOKEN en .env');
    process.exit(1);
}
// 2. Validación del clientId
if (!process.env.CLIENT_ID){
    console.error('❌ ERROR: No se encontró clientID en .env');
    process.exit(1);
}

// Todos los comandos a registrar
const commands = [
    {
        name:'commands',
        description:'Muestra todos los comandos',
    },
    {
        name: 'hola',
        description: 'Saluda a Pandabot',
    },
    {
        name: 'meme',
        description: 'Muestra un meme aleatorio',
    },
    {
        name: 'frase',
        description: 'Muestra frases inspiradoras',
    },
    {
        name: 'game',
        description: 'Play games!',
        options: [
            {
                type: 3, // Tipo STRING
                name: 'game',
                description: 'Selecciona un juego',
                required: true,
                choices: [
                    { name: 'Make It Meme', value: 'makeitmeme' },
                    { name: 'Bomb Party', value: 'bombparty' },
                    { name:'Gartic Phone', value: 'garticphone' },
                ]
            }
        ]
    },
    {
        name:'clima',
        description:'Muestra el clima de una ciudad',
        options:[
            {
                type:3,
                name:'ciudad',
                description:'Nombre de la ciudad',
                required:true
            }
        ]
    },
    {
        name:'install',
        description:"Show links to games",
        options:[{
            type:3,
            name:'option',
            description:'Selecciona un juego',
            required:true,
            choices:[
                {name:'Minecraft', value:'minecraft'},
                {name:'Valorant', value:'valorant'},
                {name:'League of Legend', value:'leagueoflegend'}
            ]
        }]
    },
    {
        name: 'music_ai',
        description: 'Recomienda música, películas, actividades, etc basadas en tu mood!',
        options: [
            {
                type: 3, // Tipo STRING
                name: 'mood',
                description: '¿Cuál es tu estado de ánimo?',
                required: true
            }
        ]
    },
    {
        name: 'pandai',
        description: 'Ask to the AI from Discord!!',
        options: [{
                type: 3, // Tipo STRING
                name: 'question',
                description: '¿Cuál es tu pregunta?',
                required: true
            }]
    },
    {
        name: 'pandagift',
        description: 'Que pandabot te de un gift!',
        options : [{
            type:3,//Tipo String
            name:'buscar',
            description:'Buscar Gift',
            required:true
        }]
    },
    {
        name: 'generate_password',
        description: 'Genera una contraseña aleatoria',
        options : [{
            type:4,//Tipo INT
            name:'longitud',
            description:'Longitud de la contraseña',
        }]
    },
    {
        name: 'textai',
        description: 'Convierte imagenes a texto!!',
        options : [{
            type:11,//Tipo Imagen
            name:'imagen',
            description:'Imagen a convertir',
            required:true
        }]
    },
    {
        name: 'set_alarm',
        description: 'Programa una alarma!',
        options: [
            {
                type: 4, // INTEGER
                name: 'timeset',
                description: 'Tiempo en minutos u horas',
                required: true
            },
            {
                type: 3, // STRING
                name: 'unit',
                description: 'Unidad del tiempo',
                required: true,
                choices: [
                    { name: 'Minutos', value: 'm' },
                    { name: 'Horas', value: 'h' }
                ]
            },
            {
                type: 3, // STRING
                name: 'task',
                description: 'What do you need to remind?',
                required: true
            }
        ]
    },
    {
        name: 'serverstatus',
        description: 'Muestra el estado del servidor de Minecraft',
        options:[
            {
                type:3,
                name:'ip_address',
                description:'Dirección IP del servidor',
                required:true
            }
        ]
    }
];


// Crear y configurar instancia REST
const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

// Registrar comandos
(async () => {
    try {
        console.log('⌛ Registrando comandos...');
        
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );
        
        console.log('✅ Comandos registrados exitosamente!');
        console.log('📜 Lista de comandos:');
        commands.forEach(cmd => {
            console.log(`- /${cmd.name}: ${cmd.description}`);
        });
        
    } catch (error) {
        console.error('❌ Error al registrar comandos:', error);
        
        // Detalles del error para debugging
        if (error.response) {
            console.error('Detalles del error:', {
                status: error.response.status,
                data: error.response.data
            });
        }
    }
})();