import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	return {
		// This makes the session available to every single page in your app
		session: await event.locals.auth()
	};
};