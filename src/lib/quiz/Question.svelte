<script>
	import { fade, slide } from 'svelte/transition';
	let { question, id, optionDisable, chosenOption = $bindable() } = $props();
</script>

<div class="flex w-full flex-col gap-2 text-lg">
	<div class="font-semibold">
		Q.No.{id + 1}
	</div>
	<div>{question.description}</div>
	<fieldset class="flex flex-row justify-between gap-2">
		{#each question.options as option, i}
			<div class="flex flex-row items-center gap-2">
				<input
					type="radio"
					disabled={optionDisable}
					id={option.id}
					name={question.id}
					value={option.description}
					class="outline-0 checked:text-purple-600 focus:text-purple-600 focus:ring-0"
					bind:group={chosenOption}
				/>
				<label for={option.id}>{option.description}</label>
			</div>
		{/each}
	</fieldset>
</div>
