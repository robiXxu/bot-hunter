const { Telegraf } = require("telegraf");
const blacklist = require("./blacklist.json");

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.on("message", async (ctx) => {
  await handleMessage(ctx);
});

bot.on("forward", async (ctx) => {
  await handleMessage(ctx);
});

bot.start("start", (ctx) => {
  console.log("BotHunter started!");
  ctx.reply("BotHunter started!");
});

bot.launch();

const handleMessage = async (ctx) => {
  if (hasBlacklistedWords(getMessage(ctx))) {
    try {
      await ctx.deleteMessage(ctx.message.message_id);
      await banUser(ctx);
    } catch (e) {
      console.error(e.response);
    }
  }
};

const banUser = async (ctx) => {
  const userId = ctx.from.id;
  await ctx.restrictChatMember(userId);
  await ctx.kickChatMember(userId);
};
const getMessage = (ctx) => ctx.message.text || ctx.message.caption;
const hasBlacklistedWords = (text) =>
  blacklist.filter((w) => text.toLowerCase().indexOf(w) !== -1).length > 0;
