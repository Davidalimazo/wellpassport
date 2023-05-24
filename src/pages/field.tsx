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
import { fieldData, clientData } from '@/assets/JsonData/test_data';
import { useEffect, useLayoutEffect, useState } from 'react';
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
import Login from './login';
import { requireAuthentication } from '@/utils/auth';
import ClientListUi from './client';
import Header from '@/components/Header';
import { format } from 'date-fns';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import placeholderImg from '@/assets/images/placeholderImg.png';

// const MainDashboard = dynamic(
//   async () => await import('@/components/dashboard/MainDashboard'),
//   { ssr: false }
// );

export interface FieldDataProp {
  id: string;
  name: string;
  numberOfWells: number;
  image?: StaticImageData;
  longitude: number;
  latitude: number;
  createdDate: string;
  clientId?: string;
  superintendent: {
    name: string;
    email: string;
    mobileNo: string;
  };
}

//@ts-ignore
const FiledListUI = ({ document }) => {
  const itemData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const [index, setIndex] = useState(0);
  const [fieldId, setFieldId] = useState('');
  const { status, data } = useSession();
  const setFieldFun = useSetField();

  console.log(document);

  const [cachedData, setCachedDta] = useState([...document]);

  const [currData, setCurrData] = useState<FieldDataProp | null>(
    cachedData.length > 0 ? cachedData[0] : null
  );

  const handleDelete = async (id: string) => {
    const post = await axios
      .delete('http://localhost:3000/api/deletefield', { data: id })
      .then((res) => {
        toast.success('Field deleted succcessfully');
        router.reload();
      })
      .catch((err) =>
        toast.error('An error while deleting field ' + err.message)
      );
  };

  const [opened, { open, close }] = useDisclosure(false);

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

  const hadnleClick = (idx: number) => {
    setIndex(idx);
  };

  if (!setFieldFun.clientId) {
    return <NoClientId />;
  }
  let clientDetails = clientData.find(({ id }) => id === setFieldFun.clientId);

  let fieldClientData = clientData.find(({ id }) => id === setFieldFun.clientId)
    ?.clientFieldData;

  if (fieldClientData && fieldClientData?.length < 1) {
    return <>NO Field Data for this client</>;
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
            {setFieldFun.clientName} | Field List
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
          {cachedData?.map(
            ({
              id,
              name,
              numberOfWells,
              image,
              longitude,
              latitude,
              createdDate,
              ...rest
            }) => (
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
                    numberOfWells,
                    longitude,
                    latitude,
                    image,
                    createdDate,
                    ...rest,
                  });
                }}
              >
                <div className="flex flex-row gap-6 items-center">
                  <Image
                    src={placeholderImg}
                    width={130}
                    height={89}
                    alt="exxon"
                  />
                  <div className="text-lg font-lekton font-semibold hidden sm:block md:block lg:block">
                    <div className="">
                      <span className="text-grey-200">Field Name: </span>
                      <span className="font-bold">{name}</span>
                    </div>
                    <div className="">
                      <span className="text-grey-200">Wells: </span>
                      <span className="font-semibold">{numberOfWells}</span>
                    </div>
                    <div className="">
                      <span className="text-grey-200">Superintendent: </span>
                      <span className="font-bold underline">
                        {rest.superintendent.name}
                      </span>
                    </div>
                  </div>
                </div>
                {index === id ? (
                  <div className="text-lg flex flex-row gap-3">
                    {data?.user.role === 'ADMIN' ? (
                      <>
                        <AiFillEye onClick={open} />

                        <AiFillEdit onClick={openEditModal} />

                        <MdDeleteForever
                          onClick={() => {
                            openDeleteModal();
                            setFieldId(id);
                          }}
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
            {cachedData.length < 1 ? (
              <p>No Fields Available</p>
            ) : (
              <PaginatedItems itemsPerPage={4} items={itemData} />
            )}
          </div>
        </div>
      </div>
      <ViewFieldModal
        open={open}
        opened={opened}
        close={close}
        title="FIELD INFORMATION"
        clientData={currData}
      />
      <AddFieldModal
        open={openAddModal}
        opened={openedAddModal}
        close={onClose}
        title="ADD NEW FIELD"
      />
      <AddFieldModal
        open={openEditModal}
        opened={openedEditModal}
        close={onCloseEdit}
        title="EDIT FIELD INFORMATION"
        clientData={currData}
        isEdit
      />
      <DeleteModal
        open={openDeleteModal}
        opened={openedDeleteModal}
        close={onCloseDelete}
        text="Are you sure you want to delete this field"
        id={fieldId}
        onDelete={() => handleDelete(fieldId)}
      />
    </>
  );
};

export default FiledListUI;

// const dashboard: FC<dashboardProps> = ({}) => {
//   return <Protected children={<DashBoard />} />;
// };

function NoClientId() {
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
        <div className="flex flex-col sm:flex-col md:flex-row lg-flex-row items-center justify-between px-6 pb-2 text-center w-full">
          <div className="text-center w-full flex flex-row items-center justify-center font-bold font-lekton">
            {' '}
            Please select a client
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const documents = await prisma.field.findMany({});
  const clients = documents.map((user) => ({
    ...user,
    createdDate: user.createdDate ? user.createdDate.toString() : null,
  }));

  return {
    props: { session, document: clients },
  };
}
