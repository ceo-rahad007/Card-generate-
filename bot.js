// ==================================================
// ⚡ RAHAT • LAB DEMO BOT (NODE.JS FIXED)
// ==================================================

// ===================== CONFIG =====================
const BOT_TOKEN = "PASTE_YOUR_BOT_TOKEN_HERE"; // 👈 এখানে bot token দাও

const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// ===================== RECEIVE MESSAGE =====================
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = (msg.text || "").trim();
  const msgId = msg.message_id;

  // ===================== COMMAND: /gen =====================
  if (text.startsWith("/gen")) {
    const pattern = text.split(" ")[1];

    if (!pattern) {
      return bot.sendMessage(
        chatId,
        "⚠️ <b>Invalid Pattern</b>\n\nUse like:\n<code>/gen DEMO</code>",
        { parse_mode: "HTML", reply_to_message_id: msgId }
      );
    }

    // typing animation
    await bot.sendChatAction(chatId, "typing");

    // loading message
    const loading = await bot.sendMessage(
      chatId,
      "⚡ <b>Rahat Engine Initializing...</b>\n⏳ Loading modules...",
      { parse_mode: "HTML", reply_to_message_id: msgId }
    );

    // generate demo items
    let items = "";
    for (let i = 1; i <= 5; i++) {
      items += buildDemoItem(i);
    }

    const finalText = `
╔══════════════════════╗
║  ⚡ <b>RAHAT • LAB GEN</b>  ║
╚══════════════════════╝

🔍 <b>Pattern:</b> <code>${pattern}</code>
🧪 <b>Mode:</b> UI Demo Engine

━━━━━━━━━━━━━━━━━━━━━━━
👤 <b>Name:</b> Rahat
🧩 <b>Type:</b> Demo Tokens
━━━━━━━━━━━━━━━━━━━━━━━

${items}
⚠️ <b>NON-REAL DATA</b>
🎮 Just for UI & Fun
🧠 Crafted by Rahat Engine ©
`;

    // edit loading message
    await bot.editMessageText(finalText, {
      chat_id: chatId,
      message_id: loading.message_id,
      parse_mode: "HTML"
    });
  }
});

// ===================== FUNCTIONS =====================

function buildDemoItem(index) {
  const token = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `
┏━ <b>ITEM #${String(index).padStart(2, "0")}</b> ━━━━━━━━━━━
┃ <code>DEMO•${token}</code>
┗━━━━━━━━━━━━━━━━━━━━━━
`;
}

console.log("Bot started successfully");
