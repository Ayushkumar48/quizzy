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
		clearInterval(interval);
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
			goto('/quiz/analytics');

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

<div class="min-h-screen bg-slate-50">
	<header class="fixed top-0 right-0 left-0 z-30 w-full bg-white shadow-sm">
		<div class="mx-auto max-w-[90rem] px-4 py-4 sm:px-6 lg:px-8">
			<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div class="space-y-1">
					<h1 class="text-xl font-bold text-slate-900 sm:text-2xl">
						{data.title || 'Random Chapter'}
					</h1>
					<p class="text-sm font-medium text-slate-600 sm:text-base">
						Topic: {data.topic || 'Random Topic'}
					</p>
				</div>

				<div class="flex flex-wrap items-center gap-4 text-sm sm:text-base">
					<div class="flex items-center gap-2">
						<span class="text-slate-600">Questions:</span>
						<span class="font-semibold text-slate-900">{data.questions.length}</span>
					</div>
					<div class="flex items-center gap-2">
						<span class="text-slate-600">Max Marks:</span>
						<span class="font-semibold text-slate-900"
							>{data.correct_answer_marks * data.questions_count}</span>
					</div>
					<div class="flex items-center gap-2">
						<span class="text-slate-600">Time:</span>
						<span
							class="font-semibold {time < 60 ? 'animate-pulse text-red-600' : 'text-slate-900'}">
							{`${String(Math.floor(time / 3600)).padStart(2, '0')}:${String(Math.floor((time % 3600) / 60)).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`}
						</span>
					</div>
					<button
						class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 rounded-lg px-4 py-2 font-medium text-white transition focus:ring-2 focus:ring-offset-2 focus:outline-none"
						onclick={() => (popupModal = true)}>
						Submit Quiz
					</button>
				</div>
			</div>
		</div>
	</header>

	<main class="mx-auto max-w-[90rem] px-4 pt-32 pb-8 sm:px-6 lg:px-8">
		<div class="relative overflow-hidden">
			{#each [data.questions[questionNo]] as question (questionNo)}
				<div
					in:fly={{ x: 50 * direction, y: 0, duration: 300, easing: quintOut }}
					out:fly={{ x: -50 * direction, y: 0, duration: 300, easing: quintOut }}>
					<Question
						{question}
						id={questionNo}
						optionDisable={false}
						bind:chosenOption={answers[questionNo]} />
				</div>
			{/each}
		</div>

		<div class="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
			<button
				class="focus:ring-primary-500 inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
				onclick={handlePrevious}
				disabled={questionNo === 0}>
				<svg class="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
					<path
						fill-rule="evenodd"
						d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
						clip-rule="evenodd" />
				</svg>
				Previous
			</button>

			<div class="flex items-center justify-center text-sm text-slate-600">
				Question {questionNo + 1} of {data.questions.length}
			</div>

			<button
				class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
				onclick={handleNext}
				disabled={questionNo === data.questions.length - 1}>
				Next
				<svg class="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
					<path
						fill-rule="evenodd"
						d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
						clip-rule="evenodd" />
				</svg>
			</button>
		</div>
	</main>
</div>

<Modal bind:open={popupModal} size="sm">
	<div class="text-center">
		<ExclamationCircleOutline class="mx-auto mb-4 h-12 w-12 text-slate-400" />
		<h3 class="mb-5 text-lg font-medium text-slate-900">
			{time === 0 ? "Time's up! Submit your quiz now." : 'Are you sure you want to end the quiz?'}
		</h3>
		<div class="flex flex-col gap-3 sm:flex-row sm:justify-center">
			<button
				type="button"
				class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
				onclick={handleSubmit}
				disabled={loading}>
				{#if loading}
					<Spinner class="mr-2" size="4" color="white" />
					Submitting...
				{:else}
					Submit Quiz
				{/if}
			</button>

			<button
				type="button"
				class="focus:ring-primary-500 inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
				disabled={time === 0}
				onclick={() => (popupModal = false)}>
				Continue Quiz
			</button>
		</div>
	</div>
</Modal>
