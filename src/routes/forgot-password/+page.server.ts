import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { generateVerificationToken } from '$lib/server/tokens';
import { sendPasswordResetEmail } from '$lib/server/email';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email')?.toString();

		if (!email) {
			return fail(400, { error: 'Please provide your email address.' });
		}

		// Check if user exists
		const [user] = await db.select().from(users).where(eq(users.email, email));

		// If user exists, generate token and send email
		// We do NOT reveal whether the email exists for security
		if (user) {
			const verificationToken = await generateVerificationToken(email);
			await sendPasswordResetEmail(email, verificationToken.token);
		}

		return { success: true };
	}
};
