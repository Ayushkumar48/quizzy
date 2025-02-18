<script>
	import Button from './Button.svelte';
	let { data } = $props();
	let completed = $state(true);
</script>

<div
	class="group relative overflow-hidden rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg sm:p-8">
	<div
		class="bg-primary-50 absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-50 transition-all group-hover:scale-150">
	</div>

	<div class="relative">
		<div class="flex items-center justify-between">
			<span class="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600"
				>Quiz #{data.id}</span>
			<span class="text-sm text-slate-500">
				{new Date(data.updated_at).toLocaleDateString('en-IN', {
					year: '2-digit',
					month: 'short',
					day: 'numeric'
				})}
			</span>
		</div>

		<h2 class="mt-4 text-xl font-bold text-slate-900">{data.title}</h2>
		<div
			class="bg-primary-50 text-primary-700 mt-2 inline-flex rounded-full px-3 py-1 text-sm font-medium">
			{data.topic}
		</div>

		<div class="mt-4 grid grid-cols-2 gap-4 rounded-lg bg-slate-50 p-4">
			<div class="text-center">
				<div class="text-sm text-slate-600">Correct</div>
				<div class="text-lg font-bold text-green-600">+{data.correct_answer_marks}</div>
			</div>
			<div class="text-center">
				<div class="text-sm text-slate-600">Wrong</div>
				<div class="text-lg font-bold text-red-500">-{data.negative_marks}</div>
			</div>
		</div>

		<div class="mt-4 flex items-center justify-end space-x-1 text-sm text-slate-600">
			<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
			<span>{data.duration} min</span>
		</div>

		<div class="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-between">
			{#if completed}
				<Button href="/quiz/analytics" className="w-full bg-green-700 hover:bg-green-600 sm:w-full">
					<svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
					</svg>
					Analytics
				</Button>
			{/if}
			<Button href="/quiz" className="w-full bg-primary-600 hover:bg-primary-700 sm:w-full">
				<svg class="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				Start Quiz
			</Button>
		</div>
	</div>
</div>
