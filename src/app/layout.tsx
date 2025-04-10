import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import './quick.css';
import './styles.css';
import '../components/styles.css';

const roobert = localFont({
  src: [
    {
      path: '../../public/fonts/Roobert-Regular.woff2',
      weight: '300',
      //style: 'normal',
    }, {
      path: '../../public/fonts/Roobert-SemiBold.woff2',
      weight: '600',
      //style: 'normal',
    }
  ],
  variable: '--font-roobert'
});
const roobertTrial = localFont({
  src: [
    {
      path: '../../public/fonts/RoobertTRIAL-Regular.woff',
      weight: '300',
      style: 'normal',
    }, {
      path: '../../public/fonts/RoobertTRIAL-SemiBold.woff',
      weight: '600',
      style: 'normal',
    }
  ],
  variable: '--font-roobert-trial'
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
  title: 'Skinstric | Home',
  description: 'Skinstric uses A.I. algorithms to find the best ingredients for your skin profile and formulates a routine just for you.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${roobert.className}`}>
        <div className='sai-container'>{children}</div>
        <div id='root-portal' />
      </body>
    </html>
  );
}
