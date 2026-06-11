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

  // 1. Delete dummy users
  const dummyUserIds = ['2', '3', '4', '5', '6'];
  console.log('Deleting dummy users...');
  for (const id of dummyUserIds) {
    const userRef = doc(db, 'users', id);
    await deleteDoc(userRef);
    console.log(`Deleted user ID: ${id}`);
  }

  // 2. Delete punches associated with dummy users
  console.log('Fetching punches...');
  const punchesSnap = await getDocs(collection(db, 'punches'));
  let count = 0;
  for (const d of punchesSnap.docs) {
    const p = d.data();
    // Delete any punch that belongs to a dummy user, or all punches except those of user '1' and '123'
    if (dummyUserIds.includes(p.userId) || (p.userId !== '1' && p.userId !== '123')) {
      await deleteDoc(doc(db, 'punches', d.id));
      console.log(`Deleted punch ID: ${d.id} belonging to user: ${p.userName}`);
      count++;
    }
  }
  console.log(`Cleanup complete! Deleted ${dummyUserIds.length} users and ${count} punches.`);
}

run().catch(console.error);
