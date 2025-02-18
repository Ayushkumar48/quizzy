<script>
	import Card from '$lib/app/Card.svelte';
	let { data } = $props();
	data = data.data;
</script>

<div class="mx-auto max-w-7xl px-4 pt-20 pb-8 sm:px-6 lg:px-8">
	<header class="mb-12">
		<h1 class="text-3xl font-bold tracking-tight">Available Quizzes</h1>
		<p class="mt-2 text-sm">Select a quiz to begin your assessment</p>
	</header>

	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		<Card {data} />
		<Card {data} />
	</div>

	{#if !data || data.length === 0}
		<div
			class="mt-12 flex flex-col items-center justify-center rounded-lg bg-slate-50 py-12 text-center">
			<svg class="h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
			</svg>
			<h3 class="mt-2 text-sm font-medium text-slate-900">No quizzes available</h3>
			<p class="mt-1 text-sm text-slate-500">Check back later for new quizzes</p>
		</div>
	{/if}
</div>
