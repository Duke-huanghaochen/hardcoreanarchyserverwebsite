import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [serverStatus, setServerStatus] = useState({ online: false, players: 0, maxPlayers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 获取服务器状态
    async function fetchServerStatus() {
      try {
        const response = await fetch('/api/server-status');
        if (!response.ok) throw new Error('Failed to fetch server status');
        const data = await response.json();
        setServerStatus({
          online: data.online,
          players: data.players.online,
          maxPlayers: data.players.max
        });
      } catch (error) {
        console.error('Error fetching server status:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchServerStatus();
    // 每30秒刷新一次
    const interval = setInterval(fetchServerStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Hardcore Anarchy Server</title>
        <meta name="description" content="Hardcore Anarchy Minecraft Server" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center">
        <h1 className="text-4xl font-bold mb-6">Hardcore Anarchy Server</h1>
        
        <div className="server-status p-6 border rounded-lg max-w-md mx-auto mb-8">
          <h2 className="text-2xl font-semibold mb-4">Server Status</h2>
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : (
            <div>
              <p className={`text-xl mb-2 ${serverStatus.online ? 'text-green-600' : 'text-red-600'}`}>
                Status: {serverStatus.online ? 'Online' : 'Offline'}
              </p>
              {serverStatus.online && (
                <p className="text-xl">
                  Players: {serverStatus.players}/{serverStatus.maxPlayers}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="connect-info">
          <h2 className="text-2xl font-semibold mb-4">Connect</h2>
          <p className="text-xl mb-2">Server IP: play.simpfun.cn</p>
          <p className="text-xl">Port: 16061</p>
        </div>
      </main>

      <footer className="mt-16 text-center text-gray-600">
        <p>Hardcore Anarchy Server © 2025</p>
      </footer>

      <style jsx global>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f8f9fa;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .server-status {
          background-color: #fff;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}