<script>
	import { Chart, Card } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	let { data } = $props();
	const { answers, questions } = data;
	let correct = $state(0);
	let incorrect = $state(0);
	let notAttempted = $state(0);
	let options = $state();

	onMount(() => {
		for (let i = 0; i < questions.length; i++) {
			if (answers[i] === 'nullnull') {
				notAttempted++;
				continue;
			}
			let correctOption = questions[i].options.find((item) => item.is_correct === true);
			if (correctOption.description === answers[i]) correct++;
			else incorrect++;
		}
	});

	$effect(() => {
		options = {
			series: [correct, incorrect, notAttempted],
			colors: ['#22c55e', '#ef4444', '#94a3b8'],
			chart: {
				height: 320,
				width: '100%',
				type: 'pie',
				fontFamily: 'inherit'
			},
			stroke: {
				colors: ['white'],
				width: 2
			},
			plotOptions: {
				pie: {
					labels: {
						show: false
					},
					size: '85%',
					dataLabels: {
						offset: -25
					}
				}
			},
			labels: ['Correct', 'Incorrect', 'Not Attempted'],
			dataLabels: {
				enabled: true,
				style: {
					fontFamily: 'inherit',
					fontWeight: '500'
				}
			},
			legend: {
				position: 'bottom',
				fontFamily: 'inherit',
				fontSize: '14px',
				markers: {
					radius: 3
				}
			}
		};
	});
</script>

<div class="mx-auto max-w-2xl">
	<Card class="overflow-hidden">
		{#if options}
			<div class="p-6">
				<h2 class="mb-4 text-center text-xl font-semibold text-slate-900">Quiz Results</h2>
				<Chart {options} class="py-4" />

				<div class="mt-6 grid grid-cols-3 gap-4 text-center">
					<div class="rounded-lg bg-green-50 p-4">
						<div class="text-sm font-medium text-green-800">Correct</div>
						<div class="mt-1 text-2xl font-semibold text-green-600">{correct}</div>
					</div>

					<div class="rounded-lg bg-red-50 p-4">
						<div class="text-sm font-medium text-red-800">Incorrect</div>
						<div class="mt-1 text-2xl font-semibold text-red-600">{incorrect}</div>
					</div>

					<div class="rounded-lg bg-slate-50 p-4">
						<div class="text-sm font-medium text-slate-800">Not Attempted</div>
						<div class="mt-1 text-2xl font-semibold text-slate-600">{notAttempted}</div>
					</div>
				</div>
			</div>

			<div class="border-t border-slate-200 bg-slate-50 px-6 py-4">
				<div class="text-center">
					<span class="text-sm font-medium text-slate-700">Total Score:</span>
					<span class="ml-2 text-2xl font-semibold text-slate-900">{correct}</span>
					<span class="text-sm font-medium text-slate-600">/ {questions.length}</span>
				</div>
			</div>
		{/if}
	</Card>
</div>
