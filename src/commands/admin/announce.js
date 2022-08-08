const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require(`discord.js`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`announce`)
    .setDescription(`Announces the message passed by the moderator/admin`)
    .setDefaultMemberPermissions(
      PermissionFlagsBits.ManageChannels | PermissionFlagsBits.ManageChannels
    )
    .addChannelOption((input) =>
      input
        .setName("channel")
        .setDescription("The channel where the announcement is announced")
        .setRequired(true)
    )
    .addStringOption((input) =>
      input
        .setName("title")
        .setDescription("The title of the announcement")
        .setRequired(true)
    )
    .addStringOption((input) =>
      input
        .setName("description")
        .setDescription("The description of the announcement")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    const title = interaction.options.getString("title");
    const description = interaction.options.getString("description");
    const announceChannel = interaction.options.getChannel("channel");
    await interaction.deferReply();
    await interaction.editReply({
      ephemeral: true,
      embeds: [
        new EmbedBuilder()
          .setTitle("Success!")
          .setDescription("Announcement has been made!"),
      ],
    });
    await announceChannel.send({
      embeds: [
        new EmbedBuilder()
          .setColor("Purple")
          .setTitle(title)
          .setDescription(description)
          .setFooter({
            iconURL: interaction.guild.iconURL(),
            text: `    |    ` + interaction.guild.name,
          }),
      ],
    });
  },
};
