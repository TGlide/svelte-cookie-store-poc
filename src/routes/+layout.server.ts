import { getCookie } from '$stores/cookieStore';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	return {
		user: await getCookie({ cookies, key: 'user' })
	};
};
