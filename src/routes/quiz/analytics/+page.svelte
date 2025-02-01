<script>
	import PieChart from '$lib/quiz/analytics/PieChart.svelte';
	import Questions from '$lib/quiz/analytics/Questions.svelte';
	let { data } = $props();
</script>

<div class="flex w-full flex-col items-center justify-center pt-20">
	<div class="w-full">
		<h5 class="px-8 text-left text-3xl font-bold leading-none text-gray-900 dark:text-white">
			Quiz Analytics
		</h5>
	</div>
	<PieChart {data} />
	<Questions {data} />
</div>
