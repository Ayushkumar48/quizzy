<script>
	let { question, id, optionDisable, chosenOption = $bindable() } = $props();
</script>

<div class="w-full rounded-lg bg-white p-6 ring-1 shadow-sm ring-slate-100 sm:p-8">
	<div class="mx-auto w-full max-w-3xl">
		<div class="flex items-start gap-4">
			<span
				class="bg-primary-50 text-primary-700 mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-base font-semibold">
				{id + 1}
			</span>
			<h3 class="text-lg font-medium text-slate-900 sm:text-base">{question.description}</h3>
		</div>

		<fieldset class="mt-6 sm:mt-2">
			<fieldset class="mt-2">
				<div class="grid gap-4 sm:grid-cols-2">
					{#each question.options as option, i}
						<div
							class="relative flex items-start rounded-lg border border-slate-200 p-4 transition-colors hover:bg-slate-50">
							<div class="flex h-5 items-center">
								<input
									type="radio"
									disabled={optionDisable}
									id={option.id}
									name={question.id}
									value={option.description}
									class="text-primary-600 focus:ring-primary-600 h-5 w-5 cursor-pointer border-slate-300 disabled:cursor-not-allowed"
									bind:group={chosenOption} />
							</div>
							<label
								for={option.id}
								class="ml-3 block cursor-pointer text-base text-slate-700 select-none {optionDisable
									? 'cursor-not-allowed opacity-60'
									: ''}">
								{option.description}
							</label>
						</div>
					{/each}
				</div>
			</fieldset>
		</fieldset>
	</div>
</div>
