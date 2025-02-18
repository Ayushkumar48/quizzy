<script>
	import SvelteMarkdown from 'svelte-markdown';
	let { answer, question, qNo } = $props();

	const isCorrect =
		answer === question.options.find((item) => item.is_correct === true).description;
</script>

<div class="overflow-hidden rounded-lg bg-white ring-1 shadow-sm ring-slate-100">
	<div class="p-6">
		<div class="flex items-start justify-between gap-4">
			<div class="flex items-start gap-3">
				<span
					class="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-medium text-slate-900">
					{qNo}
				</span>
				<h3 class="text-lg font-medium text-slate-900">{question.description}</h3>
			</div>

			{#if answer !== 'nullnull'}
				<div
					class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full {isCorrect
						? 'bg-green-50 text-green-700'
						: 'bg-red-50 text-red-700'} text-sm font-semibold">
					{isCorrect ? '+4' : '-1'}
				</div>
			{/if}
		</div>

		<div class="mt-6 space-y-4">
			<div class="rounded-lg bg-slate-50 p-4">
				<div class="grid gap-4 sm:grid-cols-2">
					<div>
						<div class="text-sm font-medium text-slate-700">Correct Answer</div>
						<div class="mt-1 text-base text-slate-900">
							{question.options.find((item) => item.is_correct === true).description}
						</div>
					</div>
					<div>
						<div class="text-sm font-medium text-slate-700">Your Answer</div>
						<div class="mt-1 text-base {isCorrect ? 'text-green-600' : 'text-red-600'}">
							{answer === 'nullnull' ? 'Not attempted' : answer}
						</div>
					</div>
				</div>
			</div>

			<div class="rounded-lg border border-slate-200 p-4">
				<h4 class="text-sm font-medium text-slate-900">Explanation</h4>
				<div class="prose prose-slate mt-2 max-w-none text-sm">
					<SvelteMarkdown source={question.detailed_solution} />
				</div>
			</div>
		</div>
	</div>
</div>
