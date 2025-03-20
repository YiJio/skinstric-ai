import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const roobert = localFont({
  src: [
    {
      path: '../../public/fonts/RoobertTRIAL-Regular.woff',
      weight: '300'
    }, {
      path: '../../public/fonts/RoobertTRIAL-SemiBold.woff',
      weight: '700',
    }
  ],
  variable: '--font-roobert'
});

/*const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});*/

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${roobert.variable} font-sans antialiased`}>
      <body
        className={`${roobert.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
