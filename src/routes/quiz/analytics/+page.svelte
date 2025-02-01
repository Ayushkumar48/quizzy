<script>
	import PieChart from '$lib/quiz/PieChart.svelte';
	let { data } = $props();
</script>

<div class="flex h-screen w-full flex-col items-center justify-center">
	<div class="w-full">
		<h5 class="px-8 text-left text-3xl font-bold leading-none text-gray-900 dark:text-white">
			Quiz Analytics
		</h5>
	</div>
	<PieChart {data} />
</div>
