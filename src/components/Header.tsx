import { FC } from 'react';
import Image, { StaticImageData } from 'next/image';
import logo from '@/assets/images/zaman.png';
import { useSession } from 'next-auth/react';
import CustomMenu from '@/components/CustomMenu';
import { AdminMenu, authMenu } from '@/assets/JsonData/menu';
import { Avatar } from '@mantine/core';

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
  const { status, data } = useSession();
  let menu = data?.user.role === 'ADMIN' ? AdminMenu : authMenu;
  return (
    <>
      <div className="h-[87px] bg-white px-6 w-full flex flex-row items-center justify-between">
        <Image src={logo} height={46} width={133} alt="Zamam logo" />
        <div className="flex flex-row items-center justify-between gap-3">
          <span className="font-semibold text-lg font-lekton">
            {data?.user.lastName[0].toUpperCase() +
              data?.user.lastName.slice(1)}
          </span>
          <CustomMenu
            button={
              <Avatar
                radius="xl"
                size="lg"
                color="blue"
                className="cursor-pointer"
              >
                DA
              </Avatar>
            }
            options={menu}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
