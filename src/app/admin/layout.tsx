'use client';
import {ReactNode, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useUser} from '@/firebase';
import {isUserAdmin} from '@/lib/firebase-admin';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {Loader} from 'lucide-react';
import {LogOut} from '@/components/log-out';

export default function AdminLayout({children}: {children: ReactNode}) {
  const {user, isUserLoading} = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    } else if (user) {
      isUserAdmin(user.uid).then((isAdmin) => {
        if (!isAdmin) {
          router.push(`/users/${user.uid}/bookings`);
        }
      });
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar>
        <SidebarHeader>
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>{/* Add Admin Navigation here */}</SidebarContent>
        <SidebarFooter>
          <LogOut />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </div>
  );
}
