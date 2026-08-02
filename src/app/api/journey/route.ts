import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }
  try {
    const userId = session.user.id;

    if (!userId) return NextResponse.json({ error: 'User not found' }, { status: 401 });

    const body = await req.json();
    const { title, originCountry, destCountry, visaType } = body;

    if (!title || !originCountry || !destCountry || !visaType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const journey = await prisma.journey.create({
      data: {
        userId,
        title,
        originCountry,
        destCountry,
        visaType,
      },
    });

    return NextResponse.json(journey, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create resource' }, { status: 500 });
  }
};
