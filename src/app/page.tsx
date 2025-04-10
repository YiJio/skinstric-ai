'use client';

// packages
import { useEffect } from 'react';
// components
import Header from '@/components/header';
import Footer from '@/components/footer';
import { HomeIntro } from './_components';

export default function Home() {

  useEffect(() => {
		document.body.classList.remove('sai-analysis-fixed');
  }, []);
  
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
