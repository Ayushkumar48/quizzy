<script>
	import eyeopen from '$lib/assets/eyeopen.svg';
	import eyeclose from '$lib/assets/eyeclose.svg';
	import { enhance } from '$app/forms';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { Spinner } from 'flowbite-svelte';

	let { login = $bindable(), form } = $props();
	let showPassword1 = $state(false);
	let showPassword2 = $state(false);
	let loading = $state(false);

	$effect(() => {
		if (form) {
			if (form.success === true) {
				toast.success('Account created successfully');
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
	in:fly={{ y: 30, duration: 500, easing: quintOut }}
	out:fade={{ duration: 200 }}>
	<div class="text-center">
		<h2
			class="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
			in:fly={{ y: -20, duration: 600, delay: 200, easing: quintOut }}>
			Create your account
		</h2>
		<p class="mt-2 text-sm text-slate-600">Start your quiz journey today</p>
	</div>

	<form
		method="POST"
		action="?/signup"
		use:enhance
		class="mt-8 space-y-6"
		in:fly={{ y: -30, duration: 600, delay: 400, easing: quintOut }}>
		<div class="grid gap-4 sm:grid-cols-2">
			<div class="space-y-2">
				<label for="firstname" class="block text-sm font-medium text-slate-700">First Name</label>
				<input
					type="text"
					name="firstname"
					id="firstname"
					required
					placeholder="John"
					value={form?.firstname ?? ''}
					class="focus:border-primary-500 focus:ring-primary-500 block w-full appearance-none rounded-lg border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:outline-none sm:text-sm"
					in:fly={{ y: -10, duration: 600, delay: 500, easing: quintOut }} />
			</div>

			<div class="space-y-2">
				<label for="lastname" class="block text-sm font-medium text-slate-700">Last Name</label>
				<input
					type="text"
					name="lastname"
					id="lastname"
					required
					placeholder="Doe"
					value={form?.lastname ?? ''}
					class="focus:border-primary-500 focus:ring-primary-500 block w-full appearance-none rounded-lg border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:outline-none sm:text-sm"
					in:fly={{ y: -10, duration: 600, delay: 600, easing: quintOut }} />
			</div>
		</div>

		<div class="space-y-2">
			<label for="username" class="block text-sm font-medium text-slate-700">Username</label>
			<input
				type="text"
				name="username"
				id="username"
				required
				placeholder="Choose a username"
				value={form?.username ?? ''}
				class="focus:border-primary-500 focus:ring-primary-500 block w-full appearance-none rounded-lg border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:outline-none sm:text-sm"
				in:fly={{ y: -10, duration: 600, delay: 700, easing: quintOut }} />
		</div>

		<div class="space-y-2">
			<label for="password" class="block text-sm font-medium text-slate-700">Password</label>
			<div class="relative">
				<input
					type={showPassword1 ? 'text' : 'password'}
					name="password"
					id="password"
					required
					placeholder="Create a strong password"
					class="focus:border-primary-500 focus:ring-primary-500 block w-full appearance-none rounded-lg border border-slate-300 px-3 py-2 pr-10 placeholder-slate-400 shadow-sm focus:outline-none sm:text-sm"
					in:fly={{ y: -10, duration: 600, delay: 800, easing: quintOut }} />
				<button
					type="button"
					class="focus:ring-primary-500 absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-slate-600 focus:ring-2 focus:outline-none"
					onclick={(e) => {
						e.preventDefault();
						showPassword1 = !showPassword1;
					}}
					aria-label={showPassword1 ? 'Hide Password' : 'Show Password'}>
					<img
						src={showPassword1 ? eyeopen : eyeclose}
						alt="toggle password visibility"
						class="h-5 w-5" />
				</button>
			</div>
		</div>

		<div class="space-y-2">
			<label for="confirmpassword" class="block text-sm font-medium text-slate-700"
				>Confirm Password</label>
			<div class="relative">
				<input
					type={showPassword2 ? 'text' : 'password'}
					name="confirmpassword"
					id="confirmpassword"
					required
					placeholder="Confirm your password"
					class="focus:border-primary-500 focus:ring-primary-500 block w-full appearance-none rounded-lg border border-slate-300 px-3 py-2 pr-10 placeholder-slate-400 shadow-sm focus:outline-none sm:text-sm"
					in:fly={{ y: -10, duration: 600, delay: 900, easing: quintOut }} />
				<button
					type="button"
					class="focus:ring-primary-500 absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-slate-600 focus:ring-2 focus:outline-none"
					onclick={(e) => {
						e.preventDefault();
						showPassword2 = !showPassword2;
					}}
					aria-label={showPassword2 ? 'Hide Password' : 'Show Password'}>
					<img
						src={showPassword2 ? eyeopen : eyeclose}
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
				in:fly={{ y: -10, duration: 600, delay: 1000, easing: quintOut }}>
				{#if loading}
					<Spinner class="mr-2" size="4" color="white" />
					Creating account...
				{:else}
					Create account
				{/if}
			</button>
		</div>
	</form>

	<p
		class="text-center text-sm text-slate-600"
		in:fly={{ y: -10, duration: 600, delay: 1100, easing: quintOut }}>
		Already have an account?{' '}
		<button
			class="text-primary-600 hover:text-primary-500 font-medium"
			onclick={() => (login = true)}>
			Sign in
		</button>
	</p>
</div>
