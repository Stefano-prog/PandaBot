const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hola')
        .setDescription('El bot te va a escribir un hola al md'),

        async execute(interaction) {
            const embed = new EmbedBuilder()
                .setAuthor({ name: interaction.user.username})
                .setTitle('PandaBot te dice')
                .setDescription(`\n> Hola ${interaction.user.username}`)

            await interaction.member.send({embeds: [embed]})
            await interaction.reply({ content: 'PandaBot te dijo algo por MD🎋🐼'})
        }
}