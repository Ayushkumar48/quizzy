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
			colors: ['#1C64F2', '#16BDCA', '#9061F9'],
			chart: {
				height: 420,
				width: '100%',
				type: 'pie'
			},
			stroke: {
				colors: ['white'],
				lineCap: ''
			},
			plotOptions: {
				pie: {
					labels: {
						show: false
					},
					size: '100%',
					dataLabels: {
						offset: -20
					}
				}
			},
			labels: ['Correct', 'Incorrect', 'Not Attempted'],
			dataLabels: {
				enabled: true
			},
			legend: {
				position: 'bottom'
			},
			yaxis: {
				labels: {
					formatter: function (value) {
						return value + '%';
					}
				}
			},
			xaxis: {
				labels: {
					formatter: function (value) {
						return value + '%';
					}
				},
				axisTicks: {
					show: true
				},
				axisBorder: {
					show: true
				}
			}
		};
	});
</script>

<div class="-z-30 flex flex-col gap-4">
	<Card>
		{#if options}
			<Chart {options} class="py-6" />
			<div class="flex flex-row justify-center gap-4">
				<div class="flex flex-col items-center justify-center">
					<div class="flex flex-row items-center justify-center gap-3">
						<div class="h-3 w-3 rounded-full bg-[#1C64F2]"></div>
						<div>Correct</div>
					</div>
					<div>({correct})</div>
				</div>
				<div class="flex flex-col items-center justify-center">
					<div class="flex flex-row items-center justify-center gap-3">
						<div class="h-3 w-3 rounded-full bg-[#16BDCA]"></div>
						<div>Incorrect</div>
					</div>
					<div>({incorrect})</div>
				</div>
				<div class="flex flex-col items-center justify-center">
					<div class="flex flex-row items-center justify-center gap-3">
						<div class="h-3 w-3 rounded-full bg-[#9061F9]"></div>
						<div>Not Attempted</div>
					</div>
					<div>({notAttempted})</div>
				</div>
			</div>
		{/if}
	</Card>
	<div class="text-center text-xl">
		Total Points Scored - <span class="font-semibold">{correct} / {questions.length}</span>
	</div>
</div>
