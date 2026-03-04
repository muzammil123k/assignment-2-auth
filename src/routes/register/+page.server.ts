import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name')?.toString();
		const email = data.get('email')?.toString();
		const password = data.get('password')?.toString();

		// 1. Basic validation
		if (!email || !password || !name) {
			return fail(400, { error: 'Missing required fields' });
		}

		// 2. Check if the user already exists
		const existingUser = await db.select().from(users).where(eq(users.email, email));
		if (existingUser.length > 0) {
			return fail(400, { error: 'Email already in use' });
		}

		// 3. Hash the password securely
		const hashedPassword = await bcrypt.hash(password, 10);

		// 4. Save the new user to the database
		await db.insert(users).values({
			name,
			email,
			password: hashedPassword,
			role: 'user' // Default role
		});

		// 5. Send them to the login page
		throw redirect(303, '/login');
	}
};