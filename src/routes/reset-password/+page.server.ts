import { fail, error, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { users, verificationTokens } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const token = url.searchParams.get('token');

	if (!token) {
		throw error(400, 'Missing reset token.');
	}

	// Verify the token exists and hasn't expired
	const [storedToken] = await db
		.select()
		.from(verificationTokens)
		.where(eq(verificationTokens.token, token));

	if (!storedToken) {
		throw error(400, 'Invalid or expired reset token.');
	}

	if (new Date() > storedToken.expires) {
		// Clean up expired token
		await db
			.delete(verificationTokens)
			.where(eq(verificationTokens.token, token));
		throw error(400, 'This reset link has expired. Please request a new one.');
	}

	return { token };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const token = data.get('token')?.toString();
		const password = data.get('password')?.toString();

		if (!token || !password) {
			return fail(400, { error: 'Token and password are required.' });
		}

		if (password.length < 6) {
			return fail(400, { error: 'Password must be at least 6 characters.' });
		}

		// Re-verify the token
		const [storedToken] = await db
			.select()
			.from(verificationTokens)
			.where(eq(verificationTokens.token, token));

		if (!storedToken || new Date() > storedToken.expires) {
			return fail(400, { error: 'Invalid or expired reset token.' });
		}

		// Hash the new password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Update the user's password
		await db
			.update(users)
			.set({ password: hashedPassword })
			.where(eq(users.email, storedToken.identifier));

		// Delete the used token
		await db
			.delete(verificationTokens)
			.where(eq(verificationTokens.token, token));

		throw redirect(303, '/login?message=password-reset');
	}
};
