import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCp930OIRfjb1blQsy_fRmqiIo4KjkcGZk',
  authDomain: 'todo-3585b.firebaseapp.com',
  projectId: 'todo-3585b',
  storageBucket: 'todo-3585b.appspot.com',
  messagingSenderId: '769219874503',
  appId: '1:769219874503:web:7fc0a09214f5b9b021f8e2'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
