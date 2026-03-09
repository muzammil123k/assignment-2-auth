import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth();

	// 1. Security Check
	if (session?.user?.role !== 'admin') {
		throw redirect(303, '/dashboard');
	}

	// 2. Fetch all users from PostgreSQL
	const allUsers = await db.select().from(users);

	// 3. Calculate Basic Analytics
	const totalUsers = allUsers.length;
	const adminCount = allUsers.filter(u => u.role === 'admin').length;
	const suspendedCount = allUsers.filter(u => u.role === 'suspended').length;
	const regularCount = totalUsers - adminCount - suspendedCount;

	return {
		session,
		users: allUsers,
		stats: { totalUsers, adminCount, regularCount, suspendedCount }
	};
};

// 4. Admin Controls (Form Actions)
export const actions: Actions = {
	updateRole: async ({ request, locals }) => {
		const session = await locals.auth();
		
		// Double-check authorization before mutating the database
		if (session?.user?.role !== 'admin') {
			return fail(403, { error: 'Unauthorized access.' });
		}

		const data = await request.formData();
		const userId = data.get('userId')?.toString();
		const newRole = data.get('role')?.toString();

		if (!userId || !newRole) {
			return fail(400, { error: 'Missing user ID or role.' });
		}

		// Prevent the admin from accidentally suspending themselves
		if (userId === session.user.id && newRole === 'suspended') {
			return fail(400, { error: 'You cannot suspend your own admin account.' });
		}

		// Update the database
		await db.update(users)
			.set({ role: newRole })
			.where(eq(users.id, userId));

		return { success: true };
	}
};