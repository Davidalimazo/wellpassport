// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import prisma from '../../lib/prismadb';
import { sendVerificationRequest } from '@/components/email_verify';
import { v4 as uuidv4 } from 'uuid';

type IRes = {
  message: string;
  data: {
    status: number;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IRes>
) {
  const reqMethod = req.method;

  switch (reqMethod) {
    case 'POST':
      try {
        const { firstName, lastName, role, email } = req.body;

        const passwordToken = uuidv4();

        const hashedPassword = await bcrypt.hash(passwordToken, 12);

        const user = await prisma.users.create({
          data: {
            email,
            password: hashedPassword,
            role,
            firstName,
            lastName,
          },
        });

        sendVerificationRequest({
          from: 'itteam@zamam.com',
          reciever: email,
          role,
          url: {
            code: passwordToken,
            base: 'http://localhost:3000',
          },
        });

        return res.status(200).json({
          message: 'New account created successfully',
          data: { status: 200 },
        });
      } catch (error: any) {
        return res.status(200).json({
          message: error.message,
          data: { status: 400 },
        });
      }

    default:
      break;
  }
}
