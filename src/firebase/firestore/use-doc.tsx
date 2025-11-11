'use client';
import {useState, useEffect} from 'react';
import {doc, onSnapshot, DocumentData, FirestoreError} from 'firebase/firestore';
import {useFirebase} from '../provider';

export function useDoc<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);
  const {firestore} = useFirebase();

  useEffect(() => {
    const docRef = doc(firestore, path);
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          setData({id: snapshot.id, ...snapshot.data()} as T);
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [path, firestore]);

  return {data, loading, error};
}
