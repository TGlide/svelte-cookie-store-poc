import { json, type Cookies } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

type GetCookieArgs = {
	key: string;
	cookies: Cookies;
};

const getCookie = ({ cookies, key }: GetCookieArgs) => {
	return JSON.parse(cookies.get(key) ?? 'null');
};

type SetCookieArgs = {
	key: string;
	value: unknown;
	cookies: Cookies;
};

const setCookie = ({ key, value, cookies }: SetCookieArgs) => {
	cookies.set(key, JSON.stringify(value), { path: '/' });
};

export const GET = (async ({ cookies, url }) => {
	const params = url.searchParams;
	const key = params.get('key');
	if (!key) {
		return json({ ok: false, error: 'Missing key' }, { status: 400 });
	}

	return json({ ok: true, value: getCookie({ key, cookies }) });
}) satisfies RequestHandler;

export const POST = (async ({ cookies, request }) => {
	const data = await request.json();
	const { key, value } = data;
	setCookie({ key, value, cookies });

	return json({ ok: true, value: getCookie({ key, cookies }) });
}) satisfies RequestHandler;
