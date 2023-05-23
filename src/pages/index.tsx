import { GetStaticProps } from 'next';
import { useEffect } from 'react';
import Head from 'next/head';
import router from 'next/router';
import { useSession } from 'next-auth/react';
import SplashScreen from '@/components/SplashScreen';

interface LocalProps {}

export default function Home({}: LocalProps) {
  const { status } = useSession();
  useEffect(() => {
    setTimeout(() => {
      if (status === 'authenticated') router.push('/client');
      else router.push('/login');
    }, 50);
  }, []);
  return (
    <>
      <Head>
        <title key="pagetitle">Zamam Well passport</title>
        <meta
          name="description"
          content="Zamam Well passport application"
          key="metadescription"
        />
      </Head>
      <div className="min-h-screen min-w-screen flex flex-col items-center justify-center relative">
        <SplashScreen />
      </div>
    </>
  );
}

// or use getStaticProps for static site generation
// export const getStaticProps: GetStaticProps<LocalProps> = async () => {
//   return {
//     props: {
//       data: { name: "david" },
//     },
//     revalidate: 60,
//   };
// };
