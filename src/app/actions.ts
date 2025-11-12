'use server';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

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
