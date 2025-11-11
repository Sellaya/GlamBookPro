import type {Metadata} from 'next';
import './globals.css';
import {ReactNode} from 'react';
import {FirebaseProvider} from '@/firebase';

export const metadata: Metadata = {
  title: 'GlamBookPro',
  description: 'Manage your salon bookings with ease.',
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <FirebaseProvider>{children}</FirebaseProvider>
      </body>
    </html>
  );
}
