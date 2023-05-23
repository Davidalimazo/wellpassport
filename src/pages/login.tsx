'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import router from 'next/router';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import userImg from '@/assets/images/user.png';
import { PasswordInput } from '@mantine/core';
import Button from '@/components/buttons/Button';
import { Input } from '@mantine/core';
import { RiUser3Line, RiLockPasswordLine } from 'react-icons/ri';
import Client from './client';

interface FieldsValues {
  email: string;
  password: string;
}

interface loginProps {}

const Login = ({}: loginProps) => {
  const session = useSession();

  const [opened, { open, close }] = useDisclosure(false);

  const { register, handleSubmit, formState, setError, clearErrors } =
    useForm<FieldsValues>();

  const { errors, isDirty, isValid, isSubmitting } = formState;

  const onSubmit = async (data: FieldsValues) => {
    let { email, password } = data;

    if (!password) {
      setError('password', {
        type: 'pattern',
        message: 'please enter your password',
      });
      return;
    }

    signIn('credentials', {
      ...data,
      email: email.toLowerCase(),
    }).then((callback) => {
      if (callback?.ok) {
        toast.error('Logged in successfully');
        router.push('/client');
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  useEffect(() => {
    if (session.status === 'authenticated') {
      router.push('/client');
    }
  }, [session.status]);

  if (session.status === 'authenticated') {
    return <Client />;
  }

  return (
    <>
      <Head>
        <title key="pagetitle">Zaman Well Passport | Log in</title>
        <meta
          name="description"
          content="Zaman Well Passport"
          key="metadescription"
        />
      </Head>
      <div className="min-h-screen min-w-screen flex flex-row justify-center px-5 lg:px-10 items-center">
        <div className="flex space-y-2 flex-col items-center px-4 py-4 lg:px-12 lg:py-12 shadow-lg border shadow-grey-500/50  rounded-lg">
          <Image src={userImg} alt="user image" />
          <div className="text-lg font-lekton font-semibold">LOG IN</div>
          <form
            className="flex flex-col gap-4 pt-4"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Input.Wrapper
              id="email"
              error={errors.email?.message}
              className="w-full"
            >
              <Input
                icon={<RiUser3Line />}
                size="xl"
                id="email"
                placeholder="Email"
                radius="xl"
                {...register('email', {
                  onBlur: (e) => {
                    if (
                      !e.target.value ||
                      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                        e.target.value
                      )
                    ) {
                      setError('email', {
                        type: 'pattern',
                        message: 'invalid email format',
                      });
                    } else {
                      clearErrors('email');
                    }
                  },
                  required: {
                    value: true,
                    message: 'email is required',
                  },
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: 'please enter a valid email',
                  },
                })}
                error={errors.email?.message && errors.email.message.length > 0}
              />
            </Input.Wrapper>
            <Input.Wrapper
              id="password"
              error={errors.password?.message}
              className="w-full"
            >
              <PasswordInput
                icon={<RiLockPasswordLine />}
                placeholder="Password"
                id="password"
                size="xl"
                radius="xl"
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Password is required',
                  },
                })}
                error={
                  errors.password?.message && errors.password.message.length > 0
                }
              />
            </Input.Wrapper>
            <div className="flex flex-row items-center justify-center">
              <Button
                children="Login"
                type="submit"
                className={`w-full`}
                variant={
                  !isDirty || !isValid || isSubmitting ? 'pressed' : 'default'
                }
                disabled={!isDirty || !isValid || isSubmitting}
              />
            </div>
          </form>
          <div className="text-[#A39D9D] text-[14px] font-jarkata">
            Forgot Password?{' '}
            <span className="text-md underline cursor-pointer">
              Reset password
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
