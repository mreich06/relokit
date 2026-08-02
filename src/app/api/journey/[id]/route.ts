import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  try {
    const { id } = await params;

    const journey = await prisma.journey.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        tasks: true,
      },
    });

    if (!journey) return NextResponse.json({ error: 'Journey not found' }, { status: 404 });

    return NextResponse.json(journey, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
