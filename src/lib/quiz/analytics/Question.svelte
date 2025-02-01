<script>
	import SvelteMarkdown from 'svelte-markdown';
	let { answer, question, qNo } = $props();
</script>

<div class="flex flex-col gap-4 rounded-lg bg-slate-100 px-5 py-4 shadow-lg ring-1 ring-gray-300">
	<div class="flex flex-row justify-between">
		<div class="flex flex-row gap-2">
			<div class="text-nowrap font-bold">Q. No.: {qNo}</div>
			<div>{question.description}</div>
		</div>
		<div
			class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 p-4 shadow-lg ring-1 ring-gray-300 empty:hidden"
		>
			{#if answer === question.options.find((item) => item.is_correct === true).description}
				<p class="text-green-600">+4</p>
			{:else}
				<p class="text-red-600">-1</p>
			{/if}
		</div>
	</div>
	<div class="flex flex-col gap-2">
		<div class="font-bold">
			Correct Answer: <span class="font-normal">
				{question.options.find((item) => item.is_correct === true).description}
			</span>
		</div>
		<div class="font-bold">
			Your Answer: <span class="font-normal">{answer === 'nullnull' ? 'No Answer' : answer}</span>
		</div>
	</div>
	<div class="font-bold">
		<span class="font-normal">
			<span class="font-bold">
				{question.detailed_solution.includes('Explanation:') ? '' : 'Explanation:\n'}
			</span>
			<SvelteMarkdown source={question.detailed_solution} />
		</span>
	</div>
</div>
