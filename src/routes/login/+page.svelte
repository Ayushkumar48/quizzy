<script>
	import laptopondesk from '$lib/assets/laptopondesk.jpg';
	import eyeopen from '$lib/assets/eyeopen.svg';
	import eyeclose from '$lib/assets/eyeclose.svg';
	import Login from '$lib/auth/Login.svelte';
	import Signup from '$lib/auth/Signup.svelte';
	let login = $state(true);
	let showPassword = $state(false);
	let { form } = $props();
</script>

<div class="flex h-screen w-full flex-row items-center justify-center">
	<div class="h-full w-1/2 shadow-xl">
		<img src={laptopondesk} alt="laptopondesk" class="h-full w-full object-cover" />
	</div>
	<div class="h-full w-1/2">
		{#if login}
			<Login bind:login {form} />
		{:else}
			<Signup bind:login {form} />
		{/if}
	</div>
</div>
