import { setCookie } from '$stores/cookieStore';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	async setUser({ request, cookies }) {
		const formData = await request.formData();
		setCookie({ cookies, key: 'user', value: formData.get('user') || null });
	}
};
