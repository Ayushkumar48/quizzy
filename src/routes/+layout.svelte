<script>
	import { Toaster } from 'svelte-sonner';
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
	let { children, data } = $props();
	import { page } from '$app/state';
</script>

<div class="fixed inset-0 flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
	<Header pathname={page.url.pathname} userData={data.user} />
	<main class="relative flex-1 overflow-auto">
		{@render children()}
	</main>
	<Toaster richColors position="top-center" />
</div>
