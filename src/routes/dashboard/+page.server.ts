import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	// Grab the session from Auth.js
	const session = await event.locals.auth();

	// If the user is not logged in, kick them to the login page
	if (!session?.user) {
		throw redirect(303, '/login');
	}

	// If they are logged in, pass the session data to the frontend
	return {
		session
	};
};