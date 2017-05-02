import * as firebase from 'firebase'
import * as secrets from './secrets'
// Initialize Firebase
const firebaseConfig = {
  apiKey: secrets.FIREBASE_API_KEY,
  authDomain: secrets.FIREBASE_AUTH_DOMAIN,
  databaseURL: secrets.FIREBASE_DATABASE_URL,
  storageBucket: secrets.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: secrets.FIREBASE_MESSAGING_SENDER_ID
}
const fb = firebase.initializeApp(firebaseConfig)
export default fb
