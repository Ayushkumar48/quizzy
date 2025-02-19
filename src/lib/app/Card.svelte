<script>
	import Button from './Button.svelte';
	// Importing lucide-svelte icons
	import { Timer, BarChart, PlayCircle } from 'lucide-svelte';
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
			<!-- Replaced inline svg with lucide Timer icon -->
			<Timer class="h-5 w-5 text-slate-600 dark:text-gray-400" />
			<span>{data.duration} min</span>
		</div>

		<div class="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-between">
			{#if completed}
				<Button href="/quiz/analytics" className="w-full bg-green-700 hover:bg-green-600 sm:w-full">
					<!-- Replaced inline svg with lucide BarChart icon -->
					<BarChart class="mr-2 h-4 w-4" />
					Analytics
				</Button>
			{/if}
			<Button href="/quiz" className="w-full bg-primary-600 hover:bg-primary-700 sm:w-full">
				<!-- Replaced inline svg with lucide PlayCircle icon -->
				<PlayCircle class="mr-2 h-4 w-4" />
				Start Quiz
			</Button>
		</div>
	</div>
</div>
