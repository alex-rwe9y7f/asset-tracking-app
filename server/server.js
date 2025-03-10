const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('assets.db');

db.run(`CREATE TABLE IF NOT EXISTS assets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  correctedName TEXT
);`);

// API to sync data from the mobile app
app.post('/sync', (req, res) => {
  const { assets } = req.body;
  
  assets.forEach(asset => {
    db.run(`INSERT INTO assets (name, correctedName) VALUES (?, ?)`, 
           [asset.name, asset.correctedName]);
  });

  res.json({ message: 'Synced successfully!' });
});

app.listen(3000, () => console.log('Server running on port 3000'));

