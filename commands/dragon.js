const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dragon")
    .setDescription("Meet a friend of bear bot!"),
  async execute(interaction) {
    const height = Math.floor(Math.random() * 100);
    const width = Math.floor(Math.random() * 100);
    return await interaction.reply(
      `Look! A friend of mine: https://placebear.com/${width + 200}/${
        height + 200
      }`
    );
  },
};
