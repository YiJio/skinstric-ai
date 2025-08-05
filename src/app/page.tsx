'use client';

// packages
import { useEffect } from 'react';
// components
import { Header, Footer } from '@/components';
import { HomeIntro } from './_components';

export default function Home() {
  
  return (
    <>
      <Header />
      <main>
        <div className='sai-wrapper'>
          <HomeIntro />
          <Footer left={<p>Skinstric developed an A.I. that creates a highly-personalized routine tailored to what your skin needs.</p>} />
        </div>
      </main>
    </>
  );
}
