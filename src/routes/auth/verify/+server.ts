import { db } from '$lib/server/db';
import { verificationTokens, users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	// 1. Grab the token from the URL
	const token = url.searchParams.get('token');

	if (!token) {
		return new Response('Missing verification token', { status: 400 });
	}

	// 2. Find the token in the database
	const existingToken = await db.query.verificationTokens.findFirst({
		where: eq(verificationTokens.token, token)
	});

	if (!existingToken) {
		return new Response('Invalid or expired token', { status: 400 });
	}

	// 3. Check if the token has expired
	if (new Date(existingToken.expires) < new Date()) {
		return new Response('Token has expired. Please register again.', { status: 400 });
	}

	// 4. Mark the user's email as verified!
	await db.update(users)
		.set({ emailVerified: new Date() })
		.where(eq(users.email, existingToken.identifier));

	// 5. Delete the token so it can't be reused
	await db.delete(verificationTokens)
		.where(eq(verificationTokens.identifier, existingToken.identifier));

	// 6. Send them to the login page
	throw redirect(302, '/login?verified=true');
};