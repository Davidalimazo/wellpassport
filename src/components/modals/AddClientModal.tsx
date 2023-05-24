import { FC } from 'react';
import { Modal, Avatar, Input } from '@mantine/core';
import Button from '../buttons/Button';
import { BsFillBuildingsFill } from 'react-icons/bs';
import { FaCloudUploadAlt, FaUser } from 'react-icons/fa';
import { IoCall } from 'react-icons/io5';
import { TbWorldLongitude } from 'react-icons/tb';
import { ImLocation } from 'react-icons/im';
import { ClientDataProp } from '@/pages/client';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import router from 'next/router';

interface ViewModalProps {
  open: () => void;
  close: () => void;
  opened: boolean;
  title?: string;
  isEdit?: boolean;
  clientData?: ClientDataProp | null;
}

interface FieldsValues {
  name: string;
  contactPerson: string;
  mobile: string;
  website: string;
  address: string;
}

const AddClientModal: FC<ViewModalProps> = ({
  open,
  opened,
  close,
  title,
  isEdit,
  clientData,
}) => {
  const {
    register,
    handleSubmit,
    formState,
    setError,
    clearErrors,
    getValues,
    reset,
  } = useForm<FieldsValues>();

  const { errors, isDirty, isValid, isSubmitting } = formState;

  const onSubmit = async (data: FieldsValues) => {
    let { name, contactPerson, mobile, website, address } = data;

    try {
      const post = await axios.post('http://localhost:3000/api/addclient', {
        name,
        contactPerson,
        mobile,
        website,
        address,
      });
      const res = await post.data;
      if (res.data.status === 200) {
        toast.success('Account created successfully');
        reset();
        router.push('/client');
      } else {
        toast.error('failed to create account');
      }
    } catch (error) {
      toast.error('An error occurred, please try again');
    }
  };
  return (
    <>
      <Modal radius={'md'} size="lg" opened={opened} onClose={close}>
        <div className="space-y-6">
          <div className="text-center text-[14px] font-bold font-lekton uppercase">
            {title}
          </div>
          <form
            className="pt-8 px-2 sm:px-6 md:px-6 lg:px-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <BsFillBuildingsFill className="text-gray-500" />
                  <span className="text-gray-400">Client Name</span>
                </div>
                <div className="text-lg font-lekton font-bold sm:pl-8 md:pl-8 lg:pl-8">
                  <Input.Wrapper id="name" error={errors.name?.message}>
                    <Input
                      radius="lg"
                      size="md"
                      placeholder={isEdit ? clientData?.name : ''}
                      {...register('name', {
                        required: {
                          value: true,
                          message: 'name is required',
                        },
                      })}
                      error={
                        errors.name?.message && errors.name.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3 w-full">
                  <FaUser className="text-gray-500" />
                  <span className="text-gray-400">Contact Person</span>
                </div>
                <div className="text-lg font-lekton font-bold">
                  <Input.Wrapper
                    id="contactPerson"
                    error={errors.contactPerson?.message}
                  >
                    <Input
                      radius="lg"
                      size="md"
                      placeholder={isEdit ? clientData?.contactperson : ''}
                      {...register('contactPerson', {
                        required: {
                          value: true,
                          message: 'contact person name is required',
                        },
                      })}
                      error={
                        errors.contactPerson?.message &&
                        errors.contactPerson.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:items-center md:items-center lg:items-center sm:flex-row md:flex-row lg:flex-row justify-between mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <IoCall className="text-gray-500" />
                  <span className="text-gray-400">Mobile Number</span>
                </div>
                <div className="text-lg font-lekton font-bold sm:pl-8 md:pl-8 lg:pl-8">
                  <Input.Wrapper id="mobile" error={errors.mobile?.message}>
                    <Input
                      radius="lg"
                      size="md"
                      placeholder={isEdit ? clientData?.mobile : ''}
                      {...register('mobile', {
                        required: {
                          value: true,
                          message: 'mobile is required',
                        },
                      })}
                      error={
                        errors.mobile?.message &&
                        errors.mobile.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
              <div className="space-y-4 mt-4 sm:mt-0 md:mt-0 lg:mt-0">
                <div className="flex flex-row items-center gap-3">
                  <TbWorldLongitude className="text-gray-500" />
                  <span className="text-gray-400">Website</span>
                </div>
                <div className="text-lg font-lekton font-bold underline">
                  <Input.Wrapper id="website" error={errors.website?.message}>
                    <Input
                      radius="lg"
                      size="md"
                      placeholder={isEdit ? clientData?.website : ''}
                      {...register('website', {
                        required: {
                          value: true,
                          message: 'website is required',
                        },
                      })}
                      error={
                        errors.website?.message &&
                        errors.website.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3">
                  <ImLocation className="text-gray-500" />
                  <span className="text-gray-400">Address</span>
                </div>
                <div className="text-lg font-lekton sm:pl-8 md:pl-8 lg:pl-8 w-full">
                  <Input.Wrapper id="address" error={errors.address?.message}>
                    <Input
                      radius="lg"
                      size="xl"
                      placeholder={isEdit ? clientData?.address : ''}
                      {...register('address', {
                        required: {
                          value: true,
                          message: 'address is required',
                        },
                      })}
                      error={
                        errors.address?.message &&
                        errors.address.message.length > 0
                      }
                    />
                  </Input.Wrapper>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="space-y-4 bg-[#F0F0F0] h-[151px] w-full flex flex-row items-center justify-center">
                <div className="text-center space-y-1 text-sm font-lekton">
                  <div className="flex flex-row items-center justify-center">
                    <FaCloudUploadAlt className="" size={30} />
                  </div>
                  <div className="">Click here to upload logo</div>
                  <div className="">OR</div>
                  <div className="">Drag Logo Here</div>
                </div>
              </div>
            </div>
            <div className="mb-4 w-full flex flex-row items-center justify-center mt-8">
              <Button
                children="Submit"
                className="font-lekton"
                type="submit"
                variant={
                  !isDirty || !isValid || isSubmitting ? 'pressed' : 'default'
                }
                disabled={!isDirty || !isValid || isSubmitting}
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddClientModal;
