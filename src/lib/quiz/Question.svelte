<script>
	import { fade } from 'svelte/transition';
	let { question, id, optionDisable, chosenOption = $bindable() } = $props();
</script>

<div
	class="min-h-[200px] rounded-lg bg-white p-6 ring-1 shadow-sm ring-slate-100"
	transition:fade={{ duration: 200 }}>
	<div class="space-y-6">
		<div class="flex items-start gap-3">
			<span
				class="bg-primary-50 text-primary-700 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm font-medium">
				{id + 1}
			</span>
			<h3 class="text-lg font-medium text-slate-900">{question.description}</h3>
		</div>

		<fieldset class="space-y-4">
			<div class="grid gap-3 sm:grid-cols-2">
				{#each question.options as option, i}
					<div
						class="relative flex items-start rounded-lg border border-slate-200 p-4 hover:bg-slate-50">
						<div class="flex h-6 items-center">
							<input
								type="radio"
								disabled={optionDisable}
								id={option.id}
								name={question.id}
								value={option.description}
								class="text-primary-600 focus:ring-primary-600 h-4 w-4 cursor-pointer border-slate-300 disabled:cursor-not-allowed"
								bind:group={chosenOption} />
						</div>
						<label
							for={option.id}
							class="ml-3 block cursor-pointer text-sm leading-6 font-medium text-slate-700 select-none {optionDisable
								? 'cursor-not-allowed opacity-60'
								: ''}">
							{option.description}
						</label>
					</div>
				{/each}
			</div>
		</fieldset>
	</div>
</div>
