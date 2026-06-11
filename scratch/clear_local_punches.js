const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '..', 'db.json');
if (fs.existsSync(dbPath)) {
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  data.punches = {};
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
  console.log('Local punches cleared successfully.');
} else {
  console.log('db.json not found.');
}
