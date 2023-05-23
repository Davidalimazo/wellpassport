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
import { fieldData, projectData } from '@/assets/JsonData/test_data';
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
import useSetProject from '@/hooks/useSetProject';
import Login from './login';
import { requireAuthentication } from '@/utils/auth';
import ViewProjectModal from '@/components/modals/ViewProjectModal';
import AddProjectModal from '@/components/modals/AddProjectModal';
import ClientListUi from './client';
import GenerateReportModal from '@/components/modals/GenerateReportModal';
import Header from '@/components/Header';

// const MainDashboard = dynamic(
//   async () => await import('@/components/dashboard/MainDashboard'),
//   { ssr: false }
// );

export interface ProjectDataProp {
  id: string;
  name: string;
  status: string;
  rig: string;
  image: StaticImageData;
  startDate: string;
  endDate: string;
  description: string;
  createdDate: string;
}

const ProjectListUI = () => {
  const itemData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const [index, setIndex] = useState('0');
  const { status, data } = useSession();
  const setFieldFun = useSetProject();

  const [currData, setCurrData] = useState<ProjectDataProp | null>(
    projectData[0]
  );

  const [opened, { open, close }] = useDisclosure(false);

  const [openedAddModal, { open: openAddModal, close: onClose }] =
    useDisclosure(false);
  const [openedEditModal, { open: openEditModal, close: onCloseEdit }] =
    useDisclosure(false);
  const [openedDeleteModal, { open: openDeleteModal, close: onCloseDelete }] =
    useDisclosure(false);
  const [
    openedGenerateModal,
    { open: openGenerateModal, close: onCloseGenereateModal },
  ] = useDisclosure(false);

  const hadnleClick = (idx: string) => {
    setIndex(idx);
  };

  if (!setFieldFun.project) {
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
              <Link href="#">Field</Link>
              <BsArrowRight />
            </div>
            <div className="flex flex-row items-center gap-1">
              <Link href="/wells">Well</Link>
              <BsArrowRight />
            </div>
            <div className="flex flex-row items-center gap-1">
              <Link href="#">Project</Link>
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
        <div className="flex flex-col sm:flex-col md:flex-row lg-flex-row items-center justify-between px-6 pb-2 space-y-3">
          <div className="text-[20px] tracking-wide font-bold font-lekton">
            {setFieldFun.project} Project List
          </div>
          <div className="text-center gap-2 flex flex-col sm:flex-row md:flex-row lg:flex-row sm:items-center md:items-center lg:items-center">
            <Button
              children="GENERATE REPORT"
              variant="outline_black"
              className="h-[28px] text-sm text-black lg:text-md w-3/3"
              onClick={openGenerateModal}
              icon={
                <>
                  <AiOutlinePlus className="text-black font-bold" />
                </>
              }
            />
            <Button
              children="ADD NEW PROJECT"
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
          {projectData.map(({ id, name, status, image, rig, ...rest }) => (
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
                  status,
                  image,
                  rig,
                  ...rest,
                });
              }}
            >
              <div className="flex flex-row gap-6 items-center">
                <Image src={image} width={130} height={89} alt="exxon" />
                <div className="text-lg font-lekton font-semibold hidden sm:block md:block lg:block">
                  <div className="">
                    <span className="text-grey-200">Project Name: </span>
                    <span className="font-bold">{name}</span>
                  </div>
                  <div className="">
                    <span className="text-grey-200">Status: </span>
                    <span className="font-semibold">{status}</span>
                  </div>
                  <div className="">
                    <span className="text-grey-200">Rig: </span>
                    <span className="font-bold underline">{rig}</span>
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
          ))}
          <div className="my-6 flex flex-row items-center justify-center">
            <PaginatedItems itemsPerPage={4} items={itemData} />
          </div>
        </div>
      </div>
      <ViewProjectModal
        open={open}
        opened={opened}
        close={close}
        title="PROJECT INFORMATION"
        clientData={currData}
      />
      <AddProjectModal
        open={openAddModal}
        opened={openedAddModal}
        close={onClose}
        title="ADD NEW PROJECT"
      />
      <AddProjectModal
        open={openEditModal}
        opened={openedEditModal}
        close={onCloseEdit}
        title="EDIT PROJECT INFORMATION"
        clientData={currData}
        isEdit
      />
      <DeleteModal
        open={openDeleteModal}
        opened={openedDeleteModal}
        close={onCloseDelete}
        text="Are you sure you want to delete this project"
        id={currData!.id}
      />
      <GenerateReportModal
        open={openGenerateModal}
        opened={openedGenerateModal}
        close={onCloseGenereateModal}
      />
    </>
  );
};

export default ProjectListUI;

// const dashboard: FC<dashboardProps> = ({}) => {
//   return <Protected children={<DashBoard />} />;
// };

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return requireAuthentication(context);
}
