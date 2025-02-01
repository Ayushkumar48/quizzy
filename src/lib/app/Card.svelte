<script>
	import Button from './Button.svelte';
	let { data } = $props();
	let completed = $state(true);
</script>

<div
	class="flex max-w-80 flex-col gap-3 rounded-lg bg-slate-100 px-4 py-2 shadow-inner ring-1 ring-gray-300"
>
	<div>Quiz No.{data.id}</div>
	<h1 class="text-lg font-bold">{data.title}</h1>
	<div class="font-bold">{data.topic}</div>
	<div class="flex flex-col gap-2">
		<div>
			<span>Correct answer: </span>
			<span class="text-green-600">+{data.correct_answer_marks}</span>
		</div>
		<div>
			<span>Wrong answer: </span>
			<span class="text-red-500">-{data.negative_marks}</span>
		</div>
	</div>
	<div class="text-right">Max. Time - <span class="font-semibold">{data.duration}min</span></div>
	<div class="text-right">
		Added On - <span class="font-semibold"
			>{new Date(data.updated_at).toLocaleDateString('en-IN', {
				year: '2-digit',
				month: 'short',
				day: 'numeric'
			})}</span
		>
	</div>
	<div class="flex w-full flex-row justify-between gap-2">
		{#if completed}
			<Button href="/quiz/analytics" className="bg-green-700 hover:bg-green-600">Analytics</Button>
		{/if}
		<Button href="/quiz" className="bg-blue-600 hover:bg-blue-500">Start</Button>
	</div>
</div>
