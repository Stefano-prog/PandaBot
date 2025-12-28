const {SlashCommandBuilder} = require('@discordjs/builders')

const generatePassword = (longitud = 16) => {
    const loweCase = 'abcdefghijklmnopqrstuvwxyz';
    const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialCaracter = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let caracteres = loweCase + upperCase + numbers + specialCaracter;
    
    const passwordArray = new Uint32Array(longitud);
    crypto.getRandomValues(passwordArray);
    let password = '';
    for (let i = 0; i < longitud; i++){
        password += caracteres[passwordArray[i] % caracteres.length];
    }
    return password;
}

module.exports={
    data: new SlashCommandBuilder()
    .setName('generate_password')
    .setDescription('Genera una contraseña aleatoria')
    .addIntegerOption(opton => 
        opton.setName('longitud')
        .setDescription('Longitud de la contraseña')
    ),

    async execute(interaction){
        const longitud = await interaction.options.getInteger('longitud') || 16;
        const password = generatePassword(longitud);
        try{
            await interaction.user.send(`Tu contraseña generada es: ${password} \n Y tiene una longitud de ${longitud} caracteres.`)
            await interaction.reply('Te enviamos la contraseña a tu MD!!🤖')
        }
        catch(error){
            console.error(`Error to generate password ${error}`);
        }  
    }
}