const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('set_alarm')
        .setDescription('Programa una alarma!')
        //Cantidad de minutos u horas
        .addIntegerOption(option => 
            option.setName('timeset')
            .setDescription('Tiempo en minutos u horas')
            .setRequired(true)
        )

        //Unidad del tiempo
        .addStringOption(option => 
            option.setName('unit')
            .setDescription('Unidad del tiempo')
            .setRequired(true)
            .addChoices(
                {name: 'Minutos', value: 'm'},
                {name: 'Horas', value: 'h'}
            )
        )

        //Tarea del usuario
        .addStringOption(option => 
            option.setName('task')
            .setDescription('What do you need to remind?')
            .setRequired(true)),
    
    async execute(interaction){
        try{
            const quantity = interaction.options.getInteger('timeset');
            const timeUnit = interaction.options.getString('unit');
            const task = interaction.options.getString('task');


            // Cálculo del tiempo en milisegundos
            const multiplicador = timeUnit === 'm' ? 60000 : 3600000;
            const ms = quantity * multiplicador;
            
            await interaction.reply({
                content: `✅ Temporizador iniciado por **${quantity}${timeUnit}**.`,
                ephemeral: true
            
            })

            // 4. El Temporizador
            setTimeout(async () => {
                const reminderEmbed = new EmbedBuilder()
                    .setColor(0x0099FF) 
                    .setTitle('🔔 ¡Tiempo cumplido!')
                    .setDescription(`Hola ${interaction.user}, tu alarma ha finalizado.`)
                    .addFields(
                        { name: 'Recordatorio:', value: `> ${task}` },
                        { name: 'Tiempo transcurrido:', value: `${quantity} ${timeUnit === 'm' ? 'minutos' : 'horas'}`, inline: true }
                    )
                    .setTimestamp()
                    .setFooter({ text: 'Alarma Personal' });

                // Usamos followUp para enviar el mensaje al canal después del tiempo
                await interaction.followUp({
                    content: `${interaction.user}`, // Mención fuera del embed para que suene el "ping"
                    embeds: [reminderEmbed]
                });
            }, ms);

        
        }
        catch(error){
            console.error(error);
        }
    }
}