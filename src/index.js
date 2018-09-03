require('dotenv-safe').config();

const Telegraf = require('telegraf');
const callbackButton = require('./callbackButton.js');
const Resolver = require('./Resolver.js');
const Help = require('./Help.js');

const plugins = require('./plugins/index');

const bot = new Telegraf(process.env.BOT_TOKEN);
global.bot = bot;
bot.use(new Resolver(process.env.RESOLVE_TOKEN).middleware);
callbackButton(bot);
new Help(bot);

bot.telegram.getMe().then(botInfo => {
  bot.options.username = botInfo.username;
});
global.plugins = plugins.loadAll(bot);

bot.startPolling();
