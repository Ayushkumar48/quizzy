<script>
	import Question from './Question.svelte';
	let { data } = $props();
	let { questions, answers } = data;
</script>

<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
	<div class="mt-8 space-y-6">
		<h2 class="text-2xl font-bold tracking-tight text-slate-900">Detailed Analysis</h2>
		<div class="space-y-8">
			{#each questions as question, i}
				<Question {question} answer={answers[i]} qNo={i + 1} />
			{/each}
		</div>
	</div>
</div>
