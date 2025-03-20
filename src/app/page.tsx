import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex flex-col shrink-1 grow-1 basis-auto'>
      <header className='flex items-center justify-between fixed left-0 top-0 w-full h-[64px] z-3 pl-[32px] pr-[32px]'>
        <div className='flex items-center gap-[16px] uppercase font-semibold text-[11px] leading-[1.6] tracking-tight'>
          <Link href='/'>Skinstric</Link>
          <div className='flex gap-[6px] opacity-60'>
            <div className='w-[4px] h-[16px] rounded-s-[2px] border-1 border-r-0' />
            <span>Intro</span>
            <div className='w-[4px] h-[16px] rounded-e-[2px] border-1 border-l-0' />
          </div>
        </div>
        <div className='flex items-center'>
          <button className='bg-[var(--button-background)] hover:bg-[var(--button-background-hover)] text-[var(--button-foreground)] w-[92px] h-8 py-2 px-4 text-[10px] uppercase font-semibold tracking-tight cursor-pointer'>Enter Code</button>
        </div>
      </header>
      <main className='relative flex flex-col shrink-1 grow-1 basis-auto'>
        <div className='flex flex-col shrink-1 grow-1 basis-auto pb-9 relative'>
          <div className='m-auto text-center'>
            <h1 className='flex flex-col font-normal text-[92px] leading-[0.945] tracking-[-6px]'>
              <span>Sophiscated</span>
              <span>Skincare</span>
            </h1>
          </div>
          <div className='absolute left-0 top-1/2 -translate-y-1/2'>
            <div className='flex'>
              <span className='uppercase'>Discover A.I.</span>
              <button>left</button>
            </div>
            <div className='absolute left-0 top-1/2 -translate-1/2 rotate-45 w-[30vw] h-[30vw] pointer-events-none repeating-background' />
          </div>
          <div className='absolute right-0 top-1/2 -translate-y-1/2'>
            <div className='flex flex-row-reverse'>
              <span className='uppercase'>Take test</span>
              <button>right</button>
            </div>
            <div className='absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rotate-45 w-[30vw] h-[30vw] pointer-events-none repeating-background' />
          </div>
          <div className='my-0 mx-auto w-full grid grid-rows-7 justify-center 2xl:grid-rows-6'>

          </div>
          <div className='fixed bottom-6 left-8 w-[320px] text-sm leading-[24px] uppercase'>Skinstric developed an A.I. that creates a highly-personalized routine tailored to what your skin needs.</div>
        </div>
        {/*<ol className='list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]'>
          <li className='mb-2 tracking-[-.01em]'>
            Get started by editing{' '}
            <code className='bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold'>
              src/app/page.tsx
            </code>
            .
          </li>
          <li className='tracking-[-.01em]'>
            Save and see your changes instantly.
          </li>
        </ol>

        <div className='flex gap-4 items-center flex-col sm:flex-row'>
          <a
            className='rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto'
            href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Image
              className='dark:invert'
              src='/vercel.svg'
              alt='Vercel logomark'
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className='rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]'
            href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
            target='_blank'
            rel='noopener noreferrer'
          >
            Read our docs
          </a>
        </div>*/}
      </main>
    </div>
  );
}
