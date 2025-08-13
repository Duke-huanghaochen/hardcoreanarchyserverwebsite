// api/server-status.js
import { status } from 'minecraft-server-util';

export default async function handler(req, res) {
  try {
    // Minecraft服务器IP和端口
    const serverIp = 'play.simpfun.cn'; // 请替换为实际服务器IP
    const serverPort = 16061; // 请替换为实际服务器端口

    const response = await status(serverIp, serverPort, {
      timeout: 5000,
    });

    res.status(200).json({
      online: true,
      version: response.version.name,
      latency: response.latency,
      players: {
        online: response.players.online,
        max: response.players.max
      }
    });
  } catch (error) {
    res.status(200).json({
      online: false,
      error: error.message
    });
  }
}