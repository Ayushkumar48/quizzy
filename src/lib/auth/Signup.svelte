<script>
	import eyeopen from '$lib/assets/eyeopen.svg';
	import eyeclose from '$lib/assets/eyeclose.svg';
	import { enhance } from '$app/forms';
	import { fade, fly, scale } from 'svelte/transition';
	import { quintInOut, quintOut } from 'svelte/easing';
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
				toast.success('Account created successfully.');
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
	in:fly={{ y: 30, duration: 500, easing: quintInOut }}
	out:fade={{ duration: 200 }}
>
	<h3
		class="text-3xl font-semibold"
		in:fly={{ y: -20, duration: 600, delay: 200, easing: quintOut }}
		out:fade={{ duration: 300 }}
	>
		Create An Account
	</h3>
	<form
		class="flex flex-col gap-2"
		method="POST"
		action="?/signup"
		use:enhance
		in:fly={{ y: -30, duration: 600, delay: 400, easing: quintOut }}
		out:fade={{ duration: 300 }}
	>
		<div class="flex w-80 flex-row justify-between gap-4">
			<div class="flex w-1/2 flex-col gap-2">
				<label for="firstname">First Name:</label>
				<input
					type="name"
					name="firstname"
					id="firstname"
					placeholder="first name"
					class="h-10 w-full rounded-lg pl-3 text-lg ring-1 ring-gray-500 placeholder:text-sm focus:outline-blue-500"
					in:fly={{ y: -10, duration: 600, delay: 500, easing: quintOut }}
					out:fade={{ duration: 300 }}
					value={form?.firstname ?? ''}
				/>
			</div>
			<div class="flex w-1/2 flex-col gap-2">
				<label for="lastname">Last Name:</label>
				<input
					type="name"
					name="lastname"
					id="lastname"
					placeholder="last name"
					class="h-10 w-full rounded-lg pl-3 text-lg ring-1 ring-gray-500 placeholder:text-sm focus:outline-blue-500"
					in:fly={{ y: -10, duration: 600, delay: 600, easing: quintOut }}
					out:fade={{ duration: 300 }}
					value={form?.lastname ?? ''}
				/>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<label for="username">Username:</label>
			<input
				type="username"
				name="username"
				id="username"
				placeholder="username"
				class="h-10 w-80 rounded-lg pl-3 text-lg ring-1 ring-gray-500 placeholder:text-sm focus:outline-blue-500"
				in:fly={{ y: -10, duration: 600, delay: 700, easing: quintOut }}
				out:fade={{ duration: 300 }}
				value={form?.username ?? ''}
			/>
		</div>
		<div class="flex flex-col gap-2">
			<label for="password">Password:</label>
			<div class="relative">
				<input
					type={showPassword1 ? 'text' : 'password'}
					name="password"
					id="password"
					placeholder="password"
					class="h-10 w-80 rounded-lg pl-3 text-lg ring-1 ring-gray-500 placeholder:text-sm"
					in:fly={{ y: -10, duration: 600, delay: 800, easing: quintOut }}
					out:fade={{ duration: 300 }}
				/>
				<button
					class="absolute right-0 top-1/2 flex h-full w-9 -translate-y-1/2 items-center justify-center border-l-2 border-slate-600"
					onclick={() => (showPassword1 = !showPassword1)}
					type="button"
					in:fly={{ y: -10, duration: 600, delay: 900, easing: quintOut }}
					out:fade={{ duration: 300 }}
				>
					<img src={showPassword1 ? eyeopen : eyeclose} alt="eyeopen" class="h-6 w-6" />
				</button>
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<label for="password">Confirm Password:</label>
			<div class="relative">
				<input
					type={showPassword2 ? 'text' : 'password'}
					name="confirmpassword"
					id="confirmpassword"
					placeholder="confirm password"
					class="h-10 w-80 rounded-lg pl-3 text-lg ring-1 ring-gray-500 placeholder:text-sm"
					in:fly={{ y: -10, duration: 600, delay: 1000, easing: quintOut }}
					out:fade={{ duration: 300 }}
				/>
				<button
					class="absolute right-0 top-1/2 flex h-full w-9 -translate-y-1/2 items-center justify-center border-l-2 border-slate-600"
					onclick={() => (showPassword2 = !showPassword2)}
					type="button"
					in:fly={{ y: -10, duration: 600, delay: 1100, easing: quintOut }}
					out:fade={{ duration: 300 }}
				>
					<img src={showPassword2 ? eyeopen : eyeclose} alt="eyeopen" class="h-6 w-6" />
				</button>
			</div>
		</div>
		<div>
			<button
				type="submit"
				class="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-white ring-1 ring-gray-300"
				in:fly={{ y: -10, duration: 600, delay: 1200, easing: quintOut }}
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
	<div
		in:fly={{ y: -10, duration: 600, delay: 1300, easing: quintOut }}
		out:fade={{ duration: 300 }}
	>
		Already have an account, <button
			class="text-blue-600 hover:text-blue-400"
			onclick={() => (login = true)}>login here.</button
		>
	</div>
</div>
