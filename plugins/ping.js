module.exports = {
  command: "ping",
  desc: "Check bot response time",
  category: "utility",
  use: ".ping",
  fromMe: false,
  filename: __filename,

  execute: async (sock, msg) => {
    const start = Date.now();
    await sock.sendMessage(msg.key.remoteJid, { text: "*GG...🥺*" });
    const latency = Date.now() - start;
    
    await sock.sendMessage(msg.key.remoteJid, { 
      text: `*PONG...😊*` 
    }, { quoted: msg });
  }
};


const {
  default: makeWASocket,
  useMultiFileAuthState
} = require("@whiskeysockets/baileys");
const axios = require("axios"); // For downloading video

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState("./session");
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
  });

  sock.ev.on("creds.update", saveCreds);

  // === URL VIDEO NOTE ===
  const jid = "94XXXXXXXXX@s.whatsapp.net";
  const videoURL = "https://files.catbox.moe/1r9qkx.mp4";

  // Download video → Buffer
  const { data } = await axios.get(videoURL, {
    responseType: "arraybuffer"
  });

  await sock.sendMessage(jid, {
    video: data,      // Buffer
    ptv: true,        // MUST -> makes it ROUND video note
    caption: "🎥 Video Note"
  });

  console.log("ROUND video note sent from URL!");
}

start();
