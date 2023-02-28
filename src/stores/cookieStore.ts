import { browser } from '$app/environment';
import { invalidateAll } from '$app/navigation';
import { page } from '$app/stores';
import type { Cookies } from '@sveltejs/kit';
import { derived, type Writable } from 'svelte/store';

type GetCookieArgs = {
	key: string;
	cookies: Cookies;
};

export function getCookie({ cookies, key }: GetCookieArgs) {
	return JSON.parse(cookies.get(key) ?? 'null');
}

type SetCookieArgs = {
	key: string;
	value: unknown;
	cookies: Cookies;
};

export function setCookie({ cookies, key, value }: SetCookieArgs) {
	cookies.set(key, JSON.stringify(value));
}

async function setCookieRest(key: string, value: unknown) {
	const res = await fetch('http://localhost:5173/api/cookie', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ key, value })
	});

	const { value: newValue } = await res.json();
	return newValue;
}

type CookieStore<T> = Omit<Writable<T>, 'update'>;

export async function createCookieStore<T>(key: string) {
	const derivedStore = derived(page, ($page) => $page.data[key]);

	const set = async (v: T) => {
		await setCookieRest(key, v);
		browser && invalidateAll();
	};

	const store: CookieStore<T> = {
		subscribe: derivedStore.subscribe,
		set
	};

	return store;
}
