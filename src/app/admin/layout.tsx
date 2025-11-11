'use client';
import {ReactNode, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useUser} from '@/firebase';
import {isUserAdmin} from '@/app/actions';
import Link from 'next/link';
import {LogOut} from 'lucide-react';
import {signOut} from 'firebase/auth';
import {useFirebase} from '@/firebase';

export default function AdminLayout({children}: {children: ReactNode}) {
  const user = useUser();
  const {auth} = useFirebase();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push('/login');
      return;
    }
    isUserAdmin(user.uid).then((isAdmin) => {
      if (!isAdmin) {
        router.push('/');
      }
    });
  }, [user, router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <Link href="/">
            <span className="text-2xl font-bold text-indigo-600">
              GlamBookPro
            </span>
          </Link>
        </div>
        <nav className="mt-6">
          <Link
            href="/admin/payments"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200"
          >
            Dashboard
          </Link>
        </nav>
        <div className="absolute bottom-0 w-full">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full py-3 px-4 text-left text-red-500 hover:bg-gray-200"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
