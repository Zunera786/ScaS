// src/server.js
import 'dotenv/config.js';
import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 4000;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

start().catch((e) => {
  console.error('Failed to start server', e);
  process.exit(1);
});
