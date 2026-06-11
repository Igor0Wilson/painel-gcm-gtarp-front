const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '..', 'db.json');
console.log('Reading db from:', dbPath);

if (!fs.existsSync(dbPath)) {
  console.log('Database file does not exist!');
  process.exit(0);
}

const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('Collection keys:', Object.keys(data));
if (data.punches) {
  const punches = Object.keys(data.punches);
  console.log('Number of punches:', punches.length);
  if (punches.length > 0) {
    console.log('Sample punch:', data.punches[punches[0]]);
  }
} else {
  console.log('No punches collection found in database.');
}
