'use client';

import {LogOut as LogOutIcon} from 'lucide-react';
import {Button} from './ui/button';
import {useAuth} from '@/firebase';
import {useRouter} from 'next/navigation';

export function LogOut() {
  const auth = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await auth.signOut();
    router.push('/login');
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleSignOut}>
      <LogOutIcon />
      <span className="sr-only">Log out</span>
    </Button>
  );
}
