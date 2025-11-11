'use client';
import {useState, useEffect} from 'react';
import {
  collection,
  query,
  onSnapshot,
  Query,
  DocumentData,
  FirestoreError,
} from 'firebase/firestore';
import {useFirebase} from '../provider';

export function useCollection<T>(path: string, q?: Query) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);
  const {firestore} = useFirebase();

  useEffect(() => {
    const collectionRef = collection(firestore, path);
    const finalQuery = q || query(collectionRef);

    const unsubscribe = onSnapshot(
      finalQuery,
      (snapshot) => {
        const docs = snapshot.docs.map(
          (doc) => ({id: doc.id, ...doc.data()} as T)
        );
        setData(docs);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [path, firestore, q]);

  return {data, loading, error};
}
