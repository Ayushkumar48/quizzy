<script>
	import Question from './Question.svelte';

	let { data } = $props();
	let { questions, answers } = data;
</script>

<div class="flex flex-col gap-4 px-8 py-10">
	<h4 class="text-3xl font-semibold">Explanation</h4>
	{#each questions as question, i}
		<Question {question} answer={answers[i]} qNo={i + 1} />
	{/each}
</div>
