<script>
	import PieChart from '$lib/quiz/analytics/PieChart.svelte';
	import Questions from '$lib/quiz/analytics/Questions.svelte';
	let { data } = $props();
</script>

<div class="min-h-screen bg-slate-50 py-8">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="space-y-12">
			<PieChart {data} />
			<Questions {data} />
		</div>
	</div>
</div>
