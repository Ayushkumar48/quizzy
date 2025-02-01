<script>
	import { Toaster } from 'svelte-sonner';
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
	let { children, data } = $props();
	import { page } from '$app/state';
</script>

<div class="relative">
	<Header pathname={page.url.pathname} userData={data.user} />
	{@render children()}
	<Toaster richColors />
</div>
