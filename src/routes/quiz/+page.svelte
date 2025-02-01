<script>
	import Question from '$lib/quiz/Question.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { slide, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { Button, Modal, Spinner } from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
	import { toast } from 'svelte-sonner';
	import { fail } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	let popupModal = $state(false);
	let { data } = $props();
	data = data.data;
	let time = $state(data.duration * 60);
	let questionNo = $state(0);
	let interval;
	let direction = $state(1);
	let answers = $state(new Array(data.questions.length).fill(null));
	let loading = $state(false);
	async function handleSubmit() {
		loading = true;
		try {
			const res = await fetch('/api/quiz', {
				method: 'POST',
				body: JSON.stringify(answers),
				headers: {
					'content-type': 'application/json'
				}
			});
			if (!res.ok) {
				toast.error('Error while submitting quiz!!!');
				return fail("Can't submit quiz");
			}
			toast.success('Quiz submitted successfully.');
			setTimeout(() => goto('/quiz/analytics'), 2000);

			const result = await res.json();
		} catch (error) {
			console.error('Error submitting quiz:', error);
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		interval = setInterval(async () => {
			if (time > 0) {
				time--;
			} else {
				clearInterval(interval);
				popupModal = true;
				handleSubmit();
			}
		}, 1000);
	});

	onDestroy(() => clearInterval(interval));

	function handleNext() {
		if (questionNo < data.questions.length - 1) {
			direction = 1;
			questionNo++;
		}
	}

	function handlePrevious() {
		if (questionNo > 0) {
			direction = -1;
			questionNo--;
		}
	}
</script>

<div class="relative w-full">
	<div
		class="fixed flex w-full flex-row justify-between gap-2 bg-white px-10 py-6 shadow-md ring-1 ring-gray-300"
	>
		<div class="flex flex-col justify-between gap-y-1">
			<h3 class="text-2xl font-bold">
				Chapter - {data.title || 'Random Chapter'}
			</h3>
			<h5 class="text-xl font-semibold">
				Topic - {data.topic || 'Random Topic'}
			</h5>
		</div>
		<div class="flex flex-col justify-between gap-2">
			<div>No. of Questions - <span class="font-semibold">{data.questions.length}</span></div>
			<div>
				Max Marks - <span class="font-semibold">
					{data.correct_answer_marks * data.questions_count}
				</span>
			</div>
			<div>
				<button
					class="rounded-md bg-green-700 px-6 py-1.5 text-white shadow-lg ring-1 ring-slate-300 duration-150 ease-in-out hover:bg-green-600"
					onclick={() => (popupModal = true)}
				>
					Submit Quiz
				</button>
			</div>
		</div>
	</div>
	<div class="items-left flex h-screen w-full flex-col justify-center gap-y-14 px-14">
		<div class="relative h-[180px]">
			<div class="pb-2 text-right">
				Time - <span
					class="font-semibold"
					class:text-red-700={time < 60}
					class:animate-pulse={time < 60}
				>
					{`${String(Math.floor(time / 3600)).padStart(2, '0')}:${String(Math.floor((time % 3600) / 60)).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`}
				</span>
			</div>
			{#each [data.questions[questionNo]] as question (questionNo)}
				<div
					class="absolute w-full"
					in:fly={{
						x: 50 * direction,
						duration: 400,
						delay: 200,
						easing: quintOut
					}}
					out:fly={{
						x: -50 * direction,
						duration: 400,
						delay: 0,
						easing: quintOut
					}}
				>
					<Question
						{question}
						id={questionNo}
						optionDisable={false}
						bind:chosenOption={answers[questionNo]}
					/>
				</div>
			{/each}
		</div>

		<div class="flex flex-row justify-between">
			<div>
				<button
					class="w-full rounded-md bg-blue-600 px-8 py-1.5 text-white shadow-lg ring-1 ring-slate-300 duration-150 ease-in-out hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-300"
					onclick={handlePrevious}
					disabled={questionNo === 0}
				>
					Previous
				</button>
			</div>

			<div>
				<button
					class="w-full rounded-md bg-blue-600 px-8 py-1.5 text-white shadow-lg ring-1 ring-slate-300 duration-150 ease-in-out hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-300"
					onclick={handleNext}
					disabled={questionNo === data.questions.length - 1}
				>
					Next
				</button>
			</div>
		</div>
	</div>
</div>

<Modal bind:open={popupModal} size="xs">
	<div class="text-center">
		<ExclamationCircleOutline class="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" />
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			{time === 0 ? 'Click submit to submit the quiz' : 'Are you sure you want to end the quiz?'}
		</h3>

		<button
			type="button"
			class="mb-2 me-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
			onclick={handleSubmit}
		>
			{#if loading}
				<div class="flex flex-row items-center justify-center gap-2">
					<Spinner color="gray" size={4} />
					...Submitting
				</div>
			{:else}
				Submit
			{/if}
		</button>
		<button
			type="button"
			class="mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-slate-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
			disabled={time === 0}
			onclick={() => (popupModal = false)}
		>
			Cancel
		</button>
	</div>
</Modal>
