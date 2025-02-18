<script>
	import eyeopen from '$lib/assets/eyeopen.svg';
	import eyeclose from '$lib/assets/eyeclose.svg';
	import { enhance } from '$app/forms';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { Spinner } from 'flowbite-svelte';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	let { login = $bindable(), form } = $props();
	let showPassword = $state(false);
	let loading = $state(false);

	$effect(() => {
		if (form) {
			if (form.success === true) {
				toast.success('User Logged in');
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
	class="mx-auto w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-lg sm:p-10"
	in:fly={{ y: -50, duration: 500, easing: quintOut }}
	out:fade={{ duration: 300 }}>
	<div class="text-center">
		<h2
			class="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
			in:fly={{ y: -20, duration: 600, delay: 200, easing: quintOut }}>
			Welcome back
		</h2>
		<p class="mt-2 text-sm text-slate-600">Please sign in to your account</p>
	</div>

	<form
		method="POST"
		action="?/login"
		use:enhance
		class="mt-8 space-y-6"
		in:fly={{ y: -30, duration: 600, delay: 400, easing: quintOut }}>
		<div class="space-y-2">
			<label for="username" class="block text-sm font-medium text-slate-700">Username</label>
			<div class="mt-1">
				<input
					type="username"
					name="username"
					id="username"
					required
					placeholder="Enter your username"
					class="focus:border-primary-500 focus:ring-primary-500 block w-full appearance-none rounded-lg border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:outline-none sm:text-sm"
					in:fly={{ y: -10, duration: 600, delay: 500, easing: quintOut }} />
			</div>
		</div>

		<div class="space-y-2">
			<label for="password" class="block text-sm font-medium text-slate-700">Password</label>
			<div class="relative mt-1">
				<input
					type={showPassword ? 'text' : 'password'}
					name="password"
					id="password"
					required
					placeholder="Enter your password"
					class="focus:border-primary-500 focus:ring-primary-500 block w-full appearance-none rounded-lg border border-slate-300 px-3 py-2 pr-10 placeholder-slate-400 shadow-sm focus:outline-none sm:text-sm"
					in:fly={{ y: -10, duration: 600, delay: 600, easing: quintOut }} />
				<button
					type="button"
					class="focus:ring-primary-500 absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-slate-600 focus:ring-2 focus:outline-none"
					onclick={(e) => {
						e.preventDefault();
						showPassword = !showPassword;
					}}
					aria-label={showPassword ? 'Hide Password' : 'Show Password'}
					in:fly={{ y: -10, duration: 600, delay: 700, easing: quintOut }}>
					<img
						src={showPassword ? eyeopen : eyeclose}
						alt="toggle password visibility"
						class="h-5 w-5" />
				</button>
			</div>
		</div>

		<div>
			<button
				type="submit"
				class="bg-primary-600 hover:bg-primary-500 focus:ring-primary-500 flex w-full justify-center rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
				disabled={loading}
				onclick={() => (loading = true)}
				in:fly={{ y: -10, duration: 600, delay: 800, easing: quintOut }}>
				{#if loading}
					<Spinner class="mr-2" size="4" color="white" />
					Signing in...
				{:else}
					Sign in
				{/if}
			</button>
		</div>
	</form>

	<div class="flex flex-col space-y-4 text-center text-sm">
		<button
			class="text-primary-600 hover:text-primary-500"
			in:fly={{ y: -10, duration: 600, delay: 900, easing: quintOut }}>
			Forgot your password?
		</button>

		<p class="text-slate-600" in:fly={{ y: -10, duration: 600, delay: 1000, easing: quintOut }}>
			Don't have an account yet?{' '}
			<button
				class="text-primary-600 hover:text-primary-500 font-medium"
				onclick={() => (login = false)}>
				Sign up
			</button>
		</p>
	</div>
</div>
