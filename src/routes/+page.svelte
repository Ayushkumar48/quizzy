<script>
	import Card from '$lib/app/Card.svelte';

	let { data } = $props();
	data = data.data;
</script>

<div class="px-10 py-8">
	<h1 class="mb-8 text-2xl font-bold">All Quizzes</h1>

	<div class="flex flex-wrap gap-x-10 gap-y-8">
		<Card {data} />
		<Card {data} />
	</div>
</div>
