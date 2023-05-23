import { Menu } from '@mantine/core';
import { signOut } from 'next-auth/react';
import router from 'next/router';
import { FC } from 'react';

interface CustomMenuProps {
  button: React.ReactNode;
  options: Array<any>;
}

const CustomMenu: FC<CustomMenuProps> = ({ button, options }) => {
  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>{button}</Menu.Target>

        <Menu.Dropdown>
          {options.map(({ icon, id, text, color }, i) => (
            <Menu.Item
              icon={icon}
              key={id}
              color={color ? `red` : 'gray'}
              onClick={() => {
                if (text === 'Log Out') {
                  router.push('/login');
                  signOut({ redirect: false, callbackUrl: '/login' });
                }
                if (text === 'Create Account') {
                  router.push('/register');
                }
              }}
            >
              {text}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default CustomMenu;
