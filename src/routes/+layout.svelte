<script>
	import { Toaster } from 'svelte-sonner';
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
	let { children, data } = $props();
	import { page } from '$app/state';
</script>

<div class="min-h-screen bg-slate-50">
	<Header pathname={page.url.pathname} userData={data.user} />
	<main class="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
		{@render children()}
	</main>
	<Toaster richColors position="top-center" />
</div>
