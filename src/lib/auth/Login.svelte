<script>
	import eyeopen from '$lib/assets/eyeopen.svg';
	import eyeclose from '$lib/assets/eyeclose.svg';
	import { enhance } from '$app/forms';
	import { fade, fly, scale } from 'svelte/transition';
	import { quintInOut, quintOut } from 'svelte/easing';
	import { Spinner } from 'flowbite-svelte';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	let { login = $bindable(), form } = $props();
	let showPassword = $state(false);
	let loading = $state(false);

	$effect(() => {
		if (form) {
			if (form.success === true) {
				toast.success('User Loggedin.');
				goto('/');
			} else {
				loading = false;
				if (form.message) {
					toast.error(form.message);
				}
			}
		}
	});
</script>

<div
	class="flex h-full w-full flex-col items-center justify-center gap-6"
	in:fly={{ y: -50, duration: 500, easing: quintOut }}
	out:fade={{ duration: 300 }}
>
	<h3
		class="text-3xl font-semibold"
		in:fly={{ y: -20, duration: 600, delay: 200, easing: quintOut }}
		out:fade={{ duration: 300 }}
	>
		Log in to your account
	</h3>
	<form
		class="flex flex-col gap-4"
		method="POST"
		action="?/login"
		use:enhance
		in:fly={{ y: -30, duration: 600, delay: 400, easing: quintOut }}
		out:fade={{ duration: 300 }}
	>
		<div class="flex flex-col gap-2">
			<label for="username">Username:</label>
			<input
				type="username"
				name="username"
				id="username"
				placeholder="username"
				class="h-10 w-80 rounded-lg pl-3 text-lg ring-1 ring-gray-500 placeholder:text-sm focus:outline-blue-500"
				in:fly={{ y: -10, duration: 600, delay: 500, easing: quintOut }}
				out:fade={{ duration: 300 }}
			/>
		</div>
		<div class="flex flex-col gap-2">
			<label for="password">Password:</label>
			<div class="relative">
				<input
					type={showPassword ? 'text' : 'password'}
					name="password"
					id="password"
					placeholder="password"
					class="h-10 w-80 rounded-lg pl-3 text-lg ring-1 ring-gray-500 placeholder:text-sm"
					in:fly={{ y: -10, duration: 600, delay: 600, easing: quintOut }}
					out:fade={{ duration: 300 }}
				/>
				<button
					class="absolute right-0 top-1/2 flex h-full w-9 -translate-y-1/2 items-center justify-center border-l-2 border-slate-600"
					onclick={(e) => {
						e.preventDefault();
						showPassword = !showPassword;
					}}
					aria-label={showPassword ? 'Hide Password' : 'Show Password'}
					type="button"
					in:fly={{ y: -10, duration: 600, delay: 700, easing: quintOut }}
					out:fade={{ duration: 300 }}
				>
					<img src={showPassword ? eyeopen : eyeclose} alt="eyeopen" class="h-6 w-6" />
				</button>
			</div>
		</div>
		<div>
			<button
				type="submit"
				class="w-full rounded-lg bg-blue-600 px-4 py-2 text-white ring-1 ring-gray-300"
				in:fly={{ y: -10, duration: 600, delay: 800, easing: quintOut }}
				out:fade={{ duration: 300 }}
				onclick={() => (loading = true)}
			>
				{#if loading}
					<Spinner color="purple" />
				{:else}
					Login
				{/if}
			</button>
		</div>
	</form>
	<button
		in:fly={{ y: -10, duration: 600, delay: 900, easing: quintOut }}
		out:fade={{ duration: 300 }}
	>
		Forgot Password?
	</button>
	<div
		in:fly={{ y: -10, duration: 600, delay: 1000, easing: quintOut }}
		out:fade={{ duration: 300 }}
	>
		Doesn't have an account yet, <button
			class="text-blue-600 hover:text-blue-400"
			onclick={() => (login = false)}>click here</button
		> to create one.
	</div>
</div>
