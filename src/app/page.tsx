'use client';
import {useUser} from '@/firebase';
import {isUserAdmin} from '@/app/actions';
import {useEffect, useState} from 'react';
import Link from 'next/link';

export default function Home() {
  const user = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      isUserAdmin(user.uid).then(setIsAdmin);
    }
  }, [user?.uid]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Welcome to GlamBookPro
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Your all-in-one solution for managing beauty salon appointments.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {user ? (
            isAdmin ? (
              <Link
                href="/admin/payments"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go to Admin Dashboard
              </Link>
            ) : (
              <Link
                href="/bookings"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                View My Bookings
              </Link>
            )
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
