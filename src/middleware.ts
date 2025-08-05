// packages
import { NextResponse, NextRequest } from 'next/server';
import { nanoid } from 'nanoid';

export function middleware(request: NextRequest) {
	const response = NextResponse.next();
	const userId = request.cookies.get('user_id')?.value;
	if (!userId) {
		const newId = nanoid();
		response.cookies.set('user_id', newId, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 365, // 1 year
		});
	}
	return response;
}

export const config = {
	matcher: ['/', '/app/:path*',
		// Always run for API routes
    '/(api|trpc)(.*)',
	],
}