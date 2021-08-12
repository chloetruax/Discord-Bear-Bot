const { SlashCommandBuilder } = require("@discordjs/builders");
const Food = require("../shared/bear_food");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bear")
    .setDescription("Say hello to a friendly bear!")
    .addSubcommand((subcommand) =>
      subcommand.setName("friend").setDescription("Meet a friend of bear bot!")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("fact").setDescription("Learn more about bears!")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("feed")
        .setDescription("Feed the friendly bear")
        .addStringOption((opt) =>
          opt.setName("food").setDescription("What do you want bear to eat?")
        )
    ),
  async execute(interaction) {
    const sub = interaction.options.getSubcommand();
    if (!sub) {
      return await interaction.reply(
        `Hello! I am a friendly bear. How are you ${interaction.member.nickname}?`
      );
    }
    switch (sub) {
      case "friend": {
        const height = Math.floor(Math.random() * 100);
        const width = Math.floor(Math.random() * 100);
        return await interaction.reply(
          `Look! A friend of mine: https://placebear.com/${width + 200}/${
            height + 200
          }`
        );
      }
      case "feed": {
        return await feed(interaction);
      }
      case "fact": {
        return await interaction.reply(`Bears are awesome!`);
      }
    }
    return interaction.reply({
      content: "I don't know what you want me to do... uhhh.. ok bye!",
      ephemeral: true,
    });
  },
};

async function feed(interaction) {
  const meal = interaction.options.getString("food");
  let toFeed = Food.filter((f) =>
    meal.toLowerCase().includes(f.food.toLowerCase())
  )[0];
  if (!toFeed)
    return await interaction.reply(
      "Aww... I thought you said you had food for me?"
    );
  if (toFeed.type === "good") {
    return await interaction.reply(
      `Oooh!! I love ${toFeed.food}! You're the best, ${interaction.member.nickname}!`
    );
  }
  if (toFeed.type === "bad") {
    return await interaction.reply(
      `Umm... I don't really like ${toFeed.food}. Thanks for thinking of me though!`
    );
  }
  if (toFeed.type === "friend") {
    return await interaction.reply(
      `But... ${toFeed.food} is our friend! We don't eat friends, regardless of what dragons say.`
    );
  }
}
