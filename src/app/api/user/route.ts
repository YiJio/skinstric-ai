// packages
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
// libraries
//import { PrismaClient } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';
// utils
import { getOrCreateUser } from '@/utils/util-db-user';

export async function GET() {
	try {
		const user = await getOrCreateUser();
		return NextResponse.json({ user });
	} catch(e) {
		console.error(e);
		return NextResponse.json({ error: 'Unable to retrieve user.' }, { status: 500 });
	}
}

export async function PUT(req: NextRequest) {
	const cookieStore = await cookies();
	const userId = cookieStore.get('user_id')?.value;
	const body = await req.json();
	const { name, location } = body;
	if (!userId) { return NextResponse.json({ error: 'User ID not found in cookies.' }, { status: 400 }); }
	await prisma.user.upsert({
		where: { id: userId },
		update: { name, location },
		create: {
			id: userId,
			name,
			location,
		},
	});
	return NextResponse.json({ success: true });
}