import { FC } from 'react';
import { Modal, Avatar, Input } from '@mantine/core';
import Button from '../buttons/Button';
import { GiField, GiHobbitDwelling } from 'react-icons/gi';
import { FaCloudUploadAlt, FaUser } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';
import { TbWorldLongitude } from 'react-icons/tb';
import { AiTwotoneMail } from 'react-icons/ai';
import { FieldDataProp } from '@/pages/field';

interface ViewModalProps {
  open: () => void;
  close: () => void;
  opened: boolean;
  title?: string;
  isEdit?: boolean;
  clientData?: FieldDataProp | null;
}

const AddFieldModal: FC<ViewModalProps> = ({
  open,
  opened,
  close,
  title,
  isEdit,
  clientData,
}) => {
  return (
    <>
      <Modal radius={'md'} size="lg" opened={opened} onClose={close}>
        <div className="space-y-6">
          <div className="text-center text-[14px] font-bold font-lekton uppercase">
            {title}
          </div>
          <div className="pt-8 px-2 sm:px-6 md:px-6 lg:px-6">
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <GiField className="text-gray-500" />
                  <span className="text-gray-400">Field Name</span>
                </div>
                <div className="text-lg font-lekton font-bold sm:pl-8 md:pl-8 lg:pl-8">
                  <Input
                    radius="lg"
                    size="md"
                    placeholder={isEdit ? clientData?.name : ''}
                  />
                </div>
              </div>
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3">
                  <GiHobbitDwelling className="text-gray-500" />
                  <span className="text-gray-400">Number of wells</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input
                    radius="lg"
                    size="md"
                    placeholder={isEdit ? String(clientData?.wells) : ''}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <TbWorldLongitude className="text-gray-500" />
                  <span className="text-gray-400">Longitude</span>
                </div>
                <div className="text-lg font-lekton font-bold sm:pl-8 md:pl-8 lg:pl-8">
                  <Input
                    radius="lg"
                    size="md"
                    placeholder={isEdit ? String(clientData?.longitude) : ''}
                  />
                </div>
              </div>
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3">
                  <TbWorldLongitude className="text-gray-500" />
                  <span className="text-gray-400">Latitude</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input
                    radius="lg"
                    size="md"
                    placeholder={isEdit ? String(clientData?.latitude) : ''}
                  />
                </div>
              </div>
            </div>
            <div className="my-4 text-gray-400 gap-2 flex flex-row">
              <FaUser /> <span>Superintendent</span>
            </div>
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <FaUser className="text-gray-500" />
                  <span className="text-gray-400">Name</span>
                </div>
                <div className="text-lg font-lekton font-bold sm:pl-8 md:pl-8 lg:pl-8">
                  <Input
                    radius="lg"
                    size="md"
                    placeholder={isEdit ? clientData?.superintendent.name : ''}
                  />
                </div>
              </div>
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3">
                  <IoCall className="text-gray-500" />
                  <span className="text-gray-400">Mobile Number</span>
                </div>
                <div className="text-lg font-lekton font-bold underline">
                  <Input
                    radius="lg"
                    size="md"
                    placeholder={
                      isEdit ? clientData?.superintendent.mobile : ''
                    }
                  />
                </div>
              </div>
            </div>
            <div className="mb-4 flex-col sm:flex-row md:flex-row lg:flex-row">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <AiTwotoneMail className="text-gray-500" />
                  <span className="text-gray-400">Email</span>
                </div>
                <div className="text-lg font-lekton sm:pl-8 md:pl-8 lg:pl-8 w-full">
                  <Input
                    radius="xl"
                    size="md"
                    className="w-full"
                    multiline
                    placeholder={isEdit ? clientData?.superintendent.email : ''}
                  />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="space-y-4 bg-[#F0F0F0] h-[151px] w-full flex flex-row items-center justify-center">
                <div className="text-center space-y-1 text-sm font-lekton">
                  <div className="flex flex-row items-center justify-center">
                    <FaCloudUploadAlt className="" size={30} />
                  </div>
                  <div className="">Click here to upload field image</div>
                  <div className="">OR</div>
                  <div className="">Drag Image Here</div>
                </div>
              </div>
            </div>
            <div className="mb-4 w-full flex flex-row items-center justify-center mt-8">
              <Button children="Submit" className="font-lekton" type="submit" />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddFieldModal;
