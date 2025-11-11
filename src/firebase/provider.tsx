'use client';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {initializeApp, getApp, getApps, FirebaseApp} from 'firebase/app';
import {
  getAuth,
  Auth,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {getFirestore, Firestore} from 'firebase/firestore';
import {firebaseConfig} from './config';
import {FirebaseErrorListener, errorEmitter} from './errors';

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const firestore = getFirestore(app);

const FirebaseContext = createContext<{
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  user: FirebaseUser | null;
  loading: boolean;
}>({
  app,
  auth,
  firestore,
  user: null,
  loading: true,
});

export const FirebaseProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{app, auth, firestore, user, loading}}>
      {children}
      <FirebaseErrorListener />
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
