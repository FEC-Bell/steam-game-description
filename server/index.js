require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();

const { getGameInfo } = require('../db/index');

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.get('/api/description/:gameid', async (req, res) => {
  const { gameid } = req.params;
  if (gameid < 1 || gameid > 100) {
    res.status(400).json({ error: 'Invalid game id' });
    return;
  }
  try {
    let gameInfo = await getGameInfo(gameid);
    res.status(200).json(gameInfo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error retrieving game description' });
  }
});

const server = app.listen(process.env.PORT || 3005, () => {
  console.log(`Server listening on ${process.env.PORT || 3005}`);
});

// Export for route tests
module.exports = { app, server };