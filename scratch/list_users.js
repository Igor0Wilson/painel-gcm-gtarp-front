const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '..', 'db.json');
if (!fs.existsSync(dbPath)) {
  console.log('Database file does not exist!');
  process.exit(0);
}

const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log('--- USERS IN DB ---');
if (data.users) {
  Object.entries(data.users).forEach(([id, user]) => {
    console.log(`ID: ${id} | Name: ${user.name} | Role: ${user.role} | Status: ${user.status}`);
  });
} else {
  console.log('No users key in database');
}
