import Image from 'next/image';
import { FC } from 'react';
import logoImg from '@/assets/images/favicon.png';
import loadingImg from '@/assets/images/loading.png';
import Spinner from '@/utils/spinner/Spinner';

interface SplashScreenProps {}

const SplashScreen: FC<SplashScreenProps> = ({}) => {
  return (
    <>
      <div className="">
        <Image
          alt="Zamam Well passport logo"
          className="animate-pulse"
          src={logoImg}
          height={82}
          width={150}
        />
      </div>
      <Spinner imageUri={loadingImg} />
    </>
  );
};

export default SplashScreen;
