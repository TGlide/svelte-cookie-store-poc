<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { user } from '$stores/user';
	import '$styles/index.css';

	$: userToSet = !$user ? 'admin' : null;
</script>

<div class="flex flex-col items-center gap-4">
	<!-- Form actions work even without JS! -->
	<form method="post" action="?/setUser" use:enhance={() => () => invalidateAll()}>
		<input type="hidden" name="user" value={userToSet} />
		<button class="btn w-full" type="submit"
			>{$user ? 'Delete user' : 'Set user'} with form action</button
		>
	</form>
	<!-- Cookie store! -->
	<button class="btn w-full" on:click={() => ($user = userToSet)}>
		{$user ? 'Delete user' : 'Set user'} with cookieStore
	</button>
	<a class="btn w-full text-center" href="/other">Navigate to other route</a>
</div>

<style lang="postcss">
	form {
		display: contents;
	}
</style>
