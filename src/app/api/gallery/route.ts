// packages
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
// libraries
//import { PrismaClient } from '@/generated/prisma/client';
import { prisma } from '@/lib/prisma';

export async function GET() {
	const cookieStore = await cookies();
	const userId = cookieStore.get('user_id')?.value;
	if (!userId) return NextResponse.json({ error: 'No user ID.' }, { status: 401 });
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { gallery: true },
	});
	if (!user) return NextResponse.json({ error: 'User not found.' }, { status: 404 });
	return NextResponse.json({ gallery: user.gallery || [] });
}

export async function PUT(req: NextRequest) {
  try {
    const { gallery } = await req.json();
		const cookieStore = await cookies();
    const userId = cookieStore.get('user_id')?.value;
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { gallery },
    });
    //console.log('UPDATING GALLERY FOR USER', userId);
    return NextResponse.json({ success: true, gallery: updatedUser.gallery });
  } catch (error) {
    console.error('PUT /api/gallery error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}