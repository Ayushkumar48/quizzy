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

<div class="fixed inset-0 flex flex-col bg-slate-50">
	<header class="flex-none bg-white shadow-sm">
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

	<main class="relative flex min-h-0 flex-1">
		<div class="flex w-full flex-col">
			<div class="flex flex-1 items-center justify-center p-4 sm:px-6 lg:px-8">
				{#each [data.questions[questionNo]] as question (questionNo)}
					<div class="w-full max-w-[90rem]">
						<Question
							{question}
							id={questionNo}
							optionDisable={false}
							bind:chosenOption={answers[questionNo]} />
					</div>
				{/each}
			</div>

			<div
				class="sticky bottom-0 mt-auto w-full border-t border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8">
				<div
					class="mx-auto flex max-w-[90rem] flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
					<button
						class="focus:ring-primary-500 inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium tracking-wide text-slate-700 uppercase shadow-sm transition hover:bg-slate-50 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
						onclick={handlePrevious}
						disabled={questionNo === 0}>
						<svg
							class="mr-2 h-5 w-5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M10 19l-7-7m0 0l7-7m-7 7h18" />
						</svg>
						Previous
					</button>

					<div class="flex items-center justify-center text-sm font-medium text-slate-600">
						<span class="flex items-center gap-2">
							<svg
								class="text-primary-500 h-5 w-5"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
							</svg>
							Question {questionNo + 1} of {data.questions.length}
						</span>
					</div>

					<button
						class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium tracking-wide text-white uppercase shadow-sm transition focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
						onclick={handleNext}
						disabled={questionNo === data.questions.length - 1}>
						Next
						<svg
							class="ml-2 h-5 w-5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	</main>
</div>

<Modal bind:open={popupModal} size="sm">
	<div class="text-center">
		<svg
			class="mx-auto h-12 w-12 text-slate-400"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
		</svg>
		<h3 class="mb-5 text-lg font-medium text-slate-900">
			{time === 0 ? "Time's up! Submit your quiz now." : 'Are you sure you want to end the quiz?'}
		</h3>
		<div class="flex flex-col gap-3 sm:flex-row sm:justify-center">
			<button
				type="button"
				class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium tracking-wide text-white uppercase shadow-sm transition focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
				onclick={handleSubmit}
				disabled={loading}>
				{#if loading}
					<Spinner class="mr-2" size="4" color="white" />
					Submitting...
				{:else}
					<svg
						class="mr-2 h-5 w-5"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
					</svg>
					Submit Quiz
				{/if}
			</button>

			<button
				type="button"
				class="focus:ring-primary-500 inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium tracking-wide text-slate-700 uppercase shadow-sm transition hover:bg-slate-50 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
				disabled={time === 0}
				onclick={() => (popupModal = false)}>
				<svg
					class="mr-2 h-5 w-5"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
				Continue Quiz
			</button>
		</div>
	</div>
</Modal>
