// packages

// components
import Header from '@/components/header';
import Footer from '@/components/footer';
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
