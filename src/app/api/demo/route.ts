// packages
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
// libraries
//import { PrismaClient } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const cookieStore = await cookies();
	const userId = cookieStore.get('user_id')?.value;
	if (!userId) { return NextResponse.json({ error: 'Missing user ID.' }, { status: 400 }); }
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { demographics: true },
	});
	return NextResponse.json(user?.demographics ?? {});
}

export async function PUT(req: NextRequest) {
  const cookieStore = await cookies();
	const userId = cookieStore.get('user_id')?.value;
	if (!userId) { return NextResponse.json({ error: 'Missing user ID.' }, { status: 400 }); }
	const body = await req.json();
	await prisma.user.update({
		where: { id: userId },
		data: {
			demographics: {
				upsert: {
					update: body,
					create: body,
				},
			},
		},
	});
	return NextResponse.json({ success: true });
}