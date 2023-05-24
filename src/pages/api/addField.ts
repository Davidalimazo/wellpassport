// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import prisma from '../../lib/prismadb';
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
        const {
          name,
          numberOfWells,
          longitude,
          latitude,
          clientId,
          superintendent,
          client,
        } = req.body;

        const user = await prisma.field.create({
          data: {
            name,
            numberOfWells,
            longitude,
            latitude,
            clientId,
            superintendent,
            client,
          },
        });

        return res.status(200).json({
          message: 'New field created successfully',
          data: { status: 200 },
        });
      } catch (error) {
        return res.status(200).json({
          //@ts-ignore
          message: error.message,
          data: { status: 400 },
        });
      }

    default:
      break;
  }
}
