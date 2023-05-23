import { FaUser } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import { MdRecycling } from 'react-icons/md';
import { AiOutlineLogin } from 'react-icons/ai';

export const settingsData = ['View Profile', 'KYC'];

export const AdminMenu = [
  {
    id: 0,
    icon: <IoMdSettings />,
    text: 'Settings',
    color: '',
  },
  {
    id: 1,
    icon: <FaUser />,
    text: 'Create Account',
    color: '',
  },
  {
    id: 2,
    icon: <MdRecycling />,
    text: 'Recycle Bin',
    color: '',
  },
  {
    id: 3,
    icon: <AiOutlineLogin />,
    text: 'Log Out',
    color: '#D72617',
  },
];
export const authMenu = [
  {
    id: 0,
    icon: <IoMdSettings />,
    text: 'Settings',
    color: '',
  },
  {
    id: 1,
    icon: <AiOutlineLogin />,
    text: 'Log Out',
    color: '#D72617',
  },
];
