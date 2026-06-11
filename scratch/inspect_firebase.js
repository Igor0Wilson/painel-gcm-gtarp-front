const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, deleteDoc, doc } = require('firebase/firestore');
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

async function run() {
  console.log('Connecting to Firebase project:', firebaseConfig.projectId);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Users
  console.log('--- REMOTE USERS ---');
  const usersSnap = await getDocs(collection(db, 'users'));
  console.log('Total users:', usersSnap.size);
  usersSnap.forEach(d => {
    const u = d.data();
    console.log(`ID: ${d.id} | Name: ${u.name} | Role: ${u.role} | Status: ${u.status} | dutyStatus: ${u.dutyStatus}`);
  });

  // Punches
  console.log('--- REMOTE PUNCHES ---');
  const punchesSnap = await getDocs(collection(db, 'punches'));
  console.log('Total punches:', punchesSnap.size);
  punchesSnap.forEach(d => {
    const p = d.data();
    console.log(`ID: ${d.id} | User: ${p.userName} (${p.userId}) | In: ${p.clockIn} | Out: ${p.clockOut} | Duration: ${p.durationHours}h`);
  });
}

run().catch(console.error);
