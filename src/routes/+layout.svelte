<script lang="ts">
	import '$styles/index.css';
	import { user } from '$stores/user';
</script>

<div class="grid place-items-center h-screen bg-black text-white">
	<div class="flex flex-col items-center gap-4">
		<h1 class="font-bold text-4xl">Welcome to SvelteKit</h1>
		<h3 class="font-semibold text-xl">Using cookies, we can easily persist state!</h3>
		<p>User in cookieStore: {$user || 'Not authenticated'}</p>
		<slot />
	</div>
</div>
