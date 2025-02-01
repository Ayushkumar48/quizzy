<script>
	import { enhance, applyAction } from '$app/forms';
	import { goto } from '$app/navigation';

	let { pathname, userData } = $props();
	async function handleSignOut() {
		return async ({}) => {
			window.location.href = '/';
		};
	}
</script>

<div
	class={`fixed flex w-full flex-row justify-between bg-slate-900 px-14 py-4 text-white ${pathname === '/quiz' ? 'hidden' : ''}`}
>
	<h1 class="pl-8 text-2xl">Quizzy</h1>
	<div class="flex flex-row items-center gap-5">
		<a href="/">Home</a>
		<a href="/quiz">Quiz</a>
		{#if userData?.username}
			<form method="POST" use:enhance={handleSignOut} action="/login/signout">
				<button type="submit">SignOut</button>
			</form>
		{:else}
			<a href="/login">Login/Signup</a>
		{/if}
	</div>
</div>
