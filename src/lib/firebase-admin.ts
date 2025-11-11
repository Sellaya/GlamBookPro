import 'server-only';
import * as admin from 'firebase-admin';
import {Booking} from './types';

const ADMIN_UID = 'sC8s4rXwP2Z6lJ8f3tH7kY9oV1r2'; // Replace with your actual admin UID

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

export const isUserAdmin = async (uid: string): Promise<boolean> => {
  return uid === ADMIN_UID;
};

export const getAllBookingsForServer = async (): Promise<Booking[]> => {
  const firestore = admin.firestore();
  const bookings: Booking[] = [];
  const usersSnapshot = await firestore.collection('users').get();
  for (const userDoc of usersSnapshot.docs) {
    const bookingsSnapshot = await userDoc.ref.collection('bookings').get();
    bookingsSnapshot.forEach((doc) => {
      bookings.push({id: doc.id, ...doc.data()} as Booking);
    });
  }
  return bookings;
};
