'use server';
import {admin} from '@/lib/firebase-admin-sdk';

export async function isUserAdmin(uid: string): Promise<boolean> {
  try {
    const userDoc = await admin
      .firestore()
      .collection('userProfile')
      .doc(uid)
      .get();
    if (userDoc.exists) {
      return userDoc.data()?.role === 'admin';
    }
    return false;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}
