import { getSession, signOut } from 'next-auth/react';
import Head from 'next/head';
import { FC, useMemo } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import prisma from '@/lib/prismadb';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import Image, { StaticImageData } from 'next/image';
import logo from '@/assets/images/zaman.png';
import { Avatar, Input, Tooltip } from '@mantine/core';
import { BiSearch } from 'react-icons/bi';
import { AiFillEye, AiFillEdit, AiOutlinePlus } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';
import { clientData } from '@/assets/JsonData/test_data';
import { useEffect, useState } from 'react';
import PaginatedItems from '@/components/Paginate';
import mobil from '@/assets/images/mobil.jpg';
import { useDisclosure } from '@mantine/hooks';
import ViewModal from '@/components/modals/ViewModal';
import Button from '@/components/buttons/Button';
import AddClientModal from '@/components/modals/AddClientModal';
import DeleteModal from '@/components/modals/DeleteModal';
import Link from 'next/link';
import router from 'next/router';
import { requireAuthentication } from '@/utils/auth';
import { toast } from 'react-hot-toast';
import Header from '@/components/Header';

// const MainDashboard = dynamic(
//   async () => await import('@/components/dashboard/MainDashboard'),
//   { ssr: false }
// );

export interface ClientDataProp {
  id: string;
  name: string;
  contactperson: string;
  website: string;
  image: any;
  mobile: string;
  address: string;
  createdDate: string;
}

//@ts-ignore

const ClientListUi: NextPage = ({ clients }) => {
  const itemData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const [index, setIndex] = useState('0');
  const { status, data } = useSession();
  const [cachedData, setCachedDta] = useState([...clientData]);

  console.log(clients);

  const [currData, setCurrData] = useState<ClientDataProp | null>(
    cachedData.length > 0 ? cachedData[0] : null
  );

  const [opened, { open, close }] = useDisclosure(false);

  const handleDelete = (id: string) => {
    const filteredData = cachedData.filter((item) => item.id !== id);
    setCachedDta(filteredData);
  };

  const [
    openedAddModal,
    { open: openAddModal, close: onClose },
  ] = useDisclosure(false);
  const [
    openedEditModal,
    { open: openEditModal, close: onCloseEdit },
  ] = useDisclosure(false);
  const [
    openedDeleteModal,
    { open: openDeleteModal, close: onCloseDelete },
  ] = useDisclosure(false);

  const hadnleClick = (idx: string) => {
    setIndex(idx);
  };

  return (
    <>
      <Head>
        <title key="pagetitle">Zamam Well Passport | Dashboard</title>
        <meta
          name="description"
          content="Zamam Well Passport application"
          key="metadescription"
        />
      </Head>
      <div className="overflow-x-hidden bg-[#E7E6E6] w-screen h-screen">
        <Header />
        <div className="flex flex-row items-center justify-center mt-">
          <Input
            placeholder="Search"
            radius="xl"
            size="lg"
            className="w-1/2 mt-12 mb-12"
            rightSection={
              <>
                <BiSearch />
              </>
            }
          />
        </div>
        <div className="flex flex-row items-center justify-between px-6 pb-2">
          <div className="text-[20px] tracking-wide font-bold font-lekton">
            CLIENT LIST
          </div>
          {data?.user.role === 'ADMIN' ? (
            <div className="text-center flex flex-row items-center">
              <Button
                children="ADD NEW CLIENT"
                className="h-[28px] text-sm lg:text-md w-3/3"
                onClick={openAddModal}
                icon={
                  <>
                    <AiOutlinePlus className="text-white font-bold" />
                  </>
                }
              />
            </div>
          ) : null}
        </div>
        <div className="bg-[#FFFCFC] rounded-lg mx-6 p-6">
          {cachedData.map(
            ({ id, name, contactperson, website, image, ...rest }) => (
              <div
                className={`cursor-pointer flex flex-row gap-3 justify-between px-4 py-4 rounded-xl mb-6 ${
                  id === index ? 'ring-2 ring-red-500' : 'ring-2 ring-[#E7E6E6]'
                }`}
                key={id}
                onClick={() => {
                  hadnleClick(id);
                  setCurrData({
                    id,
                    name,
                    contactperson,
                    website,
                    image,
                    ...rest,
                  });
                }}
              >
                <div className="flex flex-row gap-6 items-center">
                  <Image src={image} width={130} height={89} alt="exxon" />
                  <div className="text-lg font-lekton font-semibold hidden sm:block md:block lg:block">
                    <div className="">
                      <span className="text-grey-200">Client Name: </span>
                      <span className="font-bold">{name}</span>
                    </div>
                    <div className="">
                      <span className="text-grey-200">Contact Person: </span>
                      <span className="font-semibold">{contactperson}</span>
                    </div>
                    <div className="">
                      <span className="text-grey-200">Website: </span>
                      <Link
                        href={website}
                        target="_blank"
                        className="font-bold underline"
                      >
                        {website}
                      </Link>
                    </div>
                  </div>
                </div>
                {index === id ? (
                  <div className="text-lg flex flex-row gap-3">
                    {data?.user.role === 'ADMIN' ? (
                      <>
                        <AiFillEye onClick={open} />

                        <AiFillEdit onClick={openEditModal} />

                        <MdDeleteForever onClick={openDeleteModal} />
                        <DeleteModal
                          open={openDeleteModal}
                          opened={openedDeleteModal}
                          close={onCloseDelete}
                          text="Are you sure you want to delete this client"
                          id={id}
                          onDelete={() => handleDelete(id)}
                        />
                      </>
                    ) : (
                      <AiFillEye onClick={open} />
                    )}
                  </div>
                ) : null}
              </div>
            )
          )}
          <div className="my-6 flex flex-row items-center justify-center">
            <PaginatedItems itemsPerPage={4} items={itemData} />
          </div>
        </div>
      </div>
      <ViewModal
        open={open}
        opened={opened}
        close={close}
        title="CLIENT INFORMATION"
        clientData={currData}
      />
      <AddClientModal
        open={openAddModal}
        opened={openedAddModal}
        close={onClose}
        title="ADD NEW CLIENT"
      />
      <AddClientModal
        open={openEditModal}
        opened={openedEditModal}
        close={onCloseEdit}
        title="EDIT CLIENT INFORMATION"
        clientData={currData}
        isEdit
      />
    </>
  );
};

// interface clientProps {}

// const Client: FC<clientProps> = ({}) => {
//   return (
//     //@ts-ignore
//     <ProtectedRoute
//       prop={
//         <>
//           <ClientListUi />
//         </>
//       }
//       path="client"
//     />
//   );
// };

export default ClientListUi;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  const arr = ['ADMIN', 'USER'];

  if (!session || !arr.includes(session.user.role)) {
    return {
      redirect: {
        destination: '/field',
        permanent: false,
      },
    };
  }
  const clients = await prisma.client.findMany();
  return {
    props: { session, clients },
  };
}
