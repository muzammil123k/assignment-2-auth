// src/routes/login/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { users, sessions } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import type { Actions } from './$types';

export const actions: Actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();

		if (!email || !password) {
			return fail(400, { error: 'Please provide both email and password.' });
		}

		// 1. Find the user in the database
		const [user] = await db.select().from(users).where(eq(users.email, email));
		if (!user || !user.password) {
			return fail(400, { error: 'Invalid email or password.' });
		}

		// 2. Verify the password securely
		const isValid = await bcrypt.compare(password, user.password);
		if (!isValid) {
			return fail(400, { error: 'Invalid email or password.' });
		}
		if (!user.emailVerified) {
            return fail(403, { error: 'Please check your email and verify your account before logging in.' });
        }
		// 3. Generate an Auth.js compatible session token
		const sessionToken = crypto.randomUUID();
		const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

		// 4. Save the active session to the database
		await db.insert(sessions).values({
			sessionToken,
			userId: user.id,
			expires
		});

		// 5. Set the cookie so Auth.js recognizes the user globally
		cookies.set('authjs.session-token', sessionToken, {
			path: '/',
			expires,
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production'
		});

		// 6. Send them to the dashboard!
		throw redirect(303, '/dashboard');
	}
};