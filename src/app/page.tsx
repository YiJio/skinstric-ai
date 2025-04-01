// packages

// components
import Header from '@/components/header';
import HomeTitle from '@/app/_components/home-title';



export default function Home() {
  
  return (
    <>
      <Header />
      <main>
        <div className='flex flex-col shrink-1 grow-1 basis-auto pb-9 relative'>
          <HomeTitle />
          <div className='fixed bottom-6 left-8 w-[320px] text-sm leading-[24px] uppercase'>Skinstric developed an A.I. that creates a highly-personalized routine tailored to what your skin needs.</div>
        </div>
      </main>
    </>
  );
}
