// src/utils/user.ts
import { cookies } from 'next/headers';
// libraries
//import { PrismaClient } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

export async function getOrCreateUser() {
	const cookieStore = await cookies();
	const userId = cookieStore.get('user_id')?.value;
	//console.log('userid exist?', userId)
	if (!userId) throw new Error('Missing user ID cookie.');
	let user = await prisma.user.findUnique({
		where: { id: userId },
		select: { name: true, location: true, gallery: true },
	});
	if (!user) {
		user = await prisma.user.create({
			data: {
				id: userId,
				name: '',
				location: '',
				gallery: []
			},
		});
	}
	return user;
}