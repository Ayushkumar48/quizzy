<script>
	let { question, id, optionDisable, chosenOption = $bindable() } = $props();
</script>

<div
	class="w-full rounded-lg bg-white p-6 ring-1 shadow-sm ring-slate-100 sm:p-8 dark:bg-gray-800 dark:ring-gray-700">
	<div class="max-w-1xl mx-auto w-full">
		<div class="flex items-center gap-4">
			<span
				class="bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-base font-semibold">
				{id + 1}
			</span>
			<h3 class="text-lg font-medium text-slate-900 sm:text-base dark:text-white">
				{question.description}
			</h3>
		</div>

		<fieldset class="mt-6 sm:mt-8">
			<div class="grid gap-4 sm:grid-cols-2">
				{#each question.options as option, i}
					<label
						for={option.id}
						class="group relative flex cursor-pointer rounded-lg border border-slate-200 p-4 select-none hover:bg-slate-50 dark:border-gray-600 dark:hover:bg-gray-700 {optionDisable
							? 'cursor-not-allowed opacity-60'
							: ''}">
						<div class="flex w-full">
							<div class="flex h-5 items-center">
								<input
									type="radio"
									disabled={optionDisable}
									id={option.id}
									name={question.id}
									value={option.description}
									class="text-primary-600 focus:ring-primary-600 group-hover:border-primary-500 h-5 w-5 cursor-pointer border-slate-300 disabled:cursor-not-allowed dark:border-gray-600"
									bind:group={chosenOption} />
							</div>
							<div class="ml-3 flex-1">
								<span class="text-base text-slate-700 dark:text-gray-300">
									{option.description}
								</span>
							</div>
						</div>
					</label>
				{/each}
			</div>
		</fieldset>
	</div>
</div>
