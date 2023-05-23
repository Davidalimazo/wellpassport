import { getSession, signOut } from 'next-auth/react';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import prisma from '@/lib/prismadb';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import Image, { StaticImageData } from 'next/image';
import logo from '@/assets/images/zaman.png';
import { BiSearch } from 'react-icons/bi';
import { AiFillEye, AiFillEdit, AiOutlinePlus } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';
import { fieldData, wellData } from '@/assets/JsonData/test_data';
import { useEffect, useState } from 'react';
import PaginatedItems from '@/components/Paginate';
import CustomMenu from '@/components/CustomMenu';
import { Avatar, Input, Tooltip } from '@mantine/core';
import { AdminMenu } from '@/assets/JsonData/menu';
import { useDisclosure } from '@mantine/hooks';
import Button from '@/components/buttons/Button';
import DeleteModal from '@/components/modals/DeleteModal';
import Link from 'next/link';
import router from 'next/router';
import useSetField from '@/hooks/useSetField';
import { BsArrowRight } from 'react-icons/bs';
import ViewFieldModal from '@/components/modals/ViewFieldModal';
import AddFieldModal from '@/components/modals/AddFieldModal';
import ViewWellModal from '@/components/modals/ViewWellModal';
import AddWellModal from '@/components/modals/AddWellModal';
import useSetWells from '@/hooks/useSetWells';
import Login from './login';
import { requireAuthentication } from '@/utils/auth';
import ClientListUi from './client';
import Header from '@/components/Header';

// const MainDashboard = dynamic(
//   async () => await import('@/components/dashboard/MainDashboard'),
//   { ssr: false }
// );

export interface WellDataProp {
  id: string;
  name: string;
  wellType: string;
  image: StaticImageData;
  longitude: number;
  latitude: number;
  createdDate: string;
  treeSpecs: string;
  bitSize: number;
  currentStatus: string;
  totalDepth: string;
  turbingSize: number;
  flowStation: string;
  spudDate: string;
  initialCompletionDate: string;
  firstProductionDate: string;
  casing: number;
}

const WellListUI = () => {
  const itemData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const [index, setIndex] = useState('0');
  const { status, data } = useSession();
  const setFieldFun = useSetWells();

  const [currData, setCurrData] = useState<WellDataProp | null>(wellData[0]);

  const [opened, { open, close }] = useDisclosure(false);

  const [openedAddModal, { open: openAddModal, close: onClose }] =
    useDisclosure(false);
  const [openedEditModal, { open: openEditModal, close: onCloseEdit }] =
    useDisclosure(false);
  const [openedDeleteModal, { open: openDeleteModal, close: onCloseDelete }] =
    useDisclosure(false);

  const hadnleClick = (idx: string) => {
    setIndex(idx);
  };

  if (!setFieldFun.wells) {
    return <ClientListUi />;
  }
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
        <div className="my-4 flex flex-row items-center justify-between px-6 w-full">
          <div className=""></div>
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row items-center gap-1">
              <Link href="/client">Client</Link>
              <BsArrowRight />
            </div>
            <div className="flex flex-row items-center gap-1">
              <Link href="/field">Field</Link>
              <BsArrowRight />
            </div>
            <div className="flex flex-row items-center gap-1">
              <Link href="#">Well</Link>
            </div>
          </div>
        </div>
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
        <div className="flex flex-col sm:flex-col md:flex-row lg-flex-row items-center justify-between px-6 pb-2">
          <div className="text-[20px] tracking-wide font-bold font-lekton">
            {setFieldFun.wells} Well List
          </div>
          <div className="text-center flex flex-row items-center">
            <Button
              children="ADD NEW WELL"
              className="h-[28px] text-sm lg:text-md w-3/3"
              onClick={openAddModal}
              icon={
                <>
                  <AiOutlinePlus className="text-white font-bold" />
                </>
              }
            />
          </div>
        </div>
        <div className="bg-[#FFFCFC] rounded-lg mx-6 p-6">
          {wellData.map(
            ({ id, name, wellType, image, currentStatus, ...rest }) => (
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
                    wellType,
                    image,
                    currentStatus,
                    ...rest,
                  });
                }}
              >
                <div className="flex flex-row gap-6 items-center">
                  <Image src={image} width={130} height={89} alt="exxon" />
                  <div className="text-lg font-lekton font-semibold hidden sm:block md:block lg:block">
                    <div className="">
                      <span className="text-grey-200">Well Name: </span>
                      <span className="font-bold">{name}</span>
                    </div>
                    <div className="">
                      <span className="text-grey-200">Well Type: </span>
                      <span className="font-semibold">{wellType}</span>
                    </div>
                    <div className="">
                      <span className="text-grey-200">Status: </span>
                      <span className="font-bold underline">
                        {currentStatus}
                      </span>
                    </div>
                  </div>
                </div>
                {index === id ? (
                  <div className="text-lg flex flex-row gap-3">
                    <AiFillEye onClick={open} />

                    <AiFillEdit onClick={openEditModal} />

                    <MdDeleteForever onClick={openDeleteModal} />
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
      <ViewWellModal
        open={open}
        opened={opened}
        close={close}
        title="WELL INFORMATION"
        clientData={currData}
      />
      <AddWellModal
        open={openAddModal}
        opened={openedAddModal}
        close={onClose}
        title="ADD NEW WELL"
      />
      <AddWellModal
        open={openEditModal}
        opened={openedEditModal}
        close={onCloseEdit}
        title="EDIT WELL INFORMATION"
        clientData={currData}
        isEdit
      />
      <DeleteModal
        open={openDeleteModal}
        opened={openedDeleteModal}
        close={onCloseDelete}
        text="Are you sure you want to delete this field"
        id={currData!.id}
      />
    </>
  );
};

export default WellListUI;

// const dashboard: FC<dashboardProps> = ({}) => {
//   return <Protected children={<DashBoard />} />;
// };

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return requireAuthentication(context);
}
