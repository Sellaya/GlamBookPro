import 'server-only';
import {admin} from './firebase-admin-sdk';
import {Booking} from './types';

export const getBookings = async (): Promise<Booking[]> => {
  const snapshot = await admin.firestore().collection('booking').get();
  return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})) as Booking[];
};
