'use client';
import {useUser} from '@/firebase';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {Loader} from 'lucide-react';
import {isUserAdmin} from '@/lib/firebase-admin';

export default function Home() {
  const {user, isUserLoading} = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading) {
      if (user) {
        isUserAdmin(user.uid).then((isAdmin) => {
          if (isAdmin) {
            router.push('/admin/payments');
          } else {
            router.push(`/users/${user.uid}/bookings`);
          }
        });
      } else {
        router.push('/login');
      }
    }
  }, [user, isUserLoading, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  );
}
