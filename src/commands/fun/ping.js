const { SlashCommandBuilder, EmbedBuilder } = require(`discord.js`);

module.exports = {
  data: new SlashCommandBuilder()
    .setDMPermission(true)
    .setName(`ping`)
    .setDescription(`responds with pong`),

  async execute(interaction, client) {
    try {
      if (!interaction.isChatInputCommand()) return;
      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Green")
            .setTitle(`Pong! - ${Date.now() - interaction.createdTimestamp}ms`),
        ],
        ephemeral: true,
      });
    } catch (error) {
      console.error(error);
    }
  },
};
