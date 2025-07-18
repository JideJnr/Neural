import http from 'http';
import { WebSocketServer } from 'ws';
import WebSocket from 'ws';
import app from './app.js'; // your express app
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

function broadcast(message: object) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

wss.on('connection', (ws) => {
  console.log('🔌 WebSocket client connected');

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());
      console.log('📨 Message from client:', message);
    } catch (err) {
      console.error('❌ Invalid WebSocket message:', data);
    }
  });

  ws.on('error', (err) => {
    console.error('WebSocket error:', err.message);
  });
});

// Add bot control endpoints directly here since they need `broadcast`
app.post('/bot/start', (req, res) => {
  broadcast({ type: 'START', timestamp: new Date().toISOString() });
  res.status(200).json({ message: 'Start signal sent' });
});

app.post('/bot/stop', (req, res) => {
  broadcast({ type: 'STOP', timestamp: new Date().toISOString() });
  res.status(200).json({ message: 'Stop signal sent' });
});

server.listen(PORT, () => {
  console.log(`🚀 Neural API running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  wss.clients.forEach(ws => ws.close());
  server.close(() => console.log('🛑 Server gracefully shutdown'));
});
