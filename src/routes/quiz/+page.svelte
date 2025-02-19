<script>
	import Question from '$lib/quiz/Question.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { slide, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { Button, Modal, Spinner, DarkMode } from 'flowbite-svelte';
	import { toast } from 'svelte-sonner';
	import { fail } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import {
		List,
		Award,
		Timer,
		ChevronLeft,
		ChevronRight,
		FileText,
		AlertTriangle,
		Check,
		X
	} from 'lucide-svelte';

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

<div class="fixed inset-0 flex flex-col bg-slate-50 dark:bg-gray-900">
	<header class="flex-none bg-white shadow-sm dark:bg-gray-800">
		<div class="mx-auto max-w-[90rem] px-4 py-4 sm:px-6 lg:px-8">
			<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div class="hidden space-y-1 sm:block">
					<h1 class="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
						{data.title || 'Random Chapter'}
					</h1>
					<p class="text-sm font-medium text-slate-600 sm:text-base dark:text-gray-400">
						Topic: {data.topic || 'Random Topic'}
					</p>
				</div>

				<div class="flex items-center justify-between gap-4 text-sm sm:text-base">
					<div class="hidden items-center gap-2 sm:flex">
						<List class="h-5 w-5 text-slate-600 dark:text-gray-400" />
						<span class="font-semibold text-slate-900 dark:text-white"
							>{data.questions.length}</span>
					</div>
					<div class="hidden items-center gap-2 sm:flex">
						<Award class="h-5 w-5 text-slate-600 dark:text-gray-400" />
						<span class="font-semibold text-slate-900 dark:text-white"
							>{data.correct_answer_marks * data.questions_count}</span>
					</div>
					<div class="flex items-center gap-2">
						<Timer class="h-5 w-5 text-slate-600 dark:text-gray-400" />
						<span
							class="inline-block min-w-[2.5rem] text-right font-mono font-semibold tabular-nums {time <
							60
								? 'animate-pulse text-red-600'
								: 'text-slate-900 dark:text-white'}">
							{`${String(Math.floor(time / 3600)).padStart(2, '0')}:${String(Math.floor((time % 3600) / 60)).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`}
						</span>
					</div>
					<button
						class="bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 focus:ring-primary-500 rounded-lg px-4 py-2 font-medium text-white transition focus:ring-2 focus:ring-offset-2 focus:outline-none"
						onclick={() => (popupModal = true)}>
						Submit Quiz
					</button>
					<DarkMode class="hidden text-gray-500 sm:block dark:text-gray-400" />
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
				class="sticky bottom-0 mt-auto w-full border-t border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8 dark:border-gray-700 dark:bg-gray-800">
				<div
					class="mx-auto grid max-w-[90rem] grid-cols-3 gap-3 sm:flex sm:items-center sm:justify-between">
					<button
						class="focus:ring-primary-500 inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium tracking-wide text-slate-700 uppercase shadow-sm transition hover:bg-slate-50 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
						onclick={handlePrevious}
						disabled={questionNo === 0}>
						<ChevronLeft class="mr-2 h-5 w-5" />
						Previous
					</button>

					<div
						class="flex items-center justify-center text-sm font-medium text-slate-600 dark:text-gray-400">
						<span class="flex items-center gap-2">
							<FileText class="text-primary-500 dark:text-primary-400 h-5 w-5" />
							{questionNo + 1} of {data.questions.length}
						</span>
					</div>

					<button
						class="bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 focus:ring-primary-500 inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium tracking-wide text-white uppercase shadow-sm transition focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
						onclick={handleNext}
						disabled={questionNo === data.questions.length - 1}>
						Next
						<ChevronRight class="ml-2 h-5 w-5" />
					</button>
				</div>
			</div>
		</div>
	</main>
</div>

<Modal bind:open={popupModal} size="sm" class="dark:bg-gray-800">
	<div class="text-center">
		<AlertTriangle class="mx-auto h-12 w-12 text-slate-400 dark:text-gray-500" />
		<h3 class="mb-5 text-lg font-medium text-slate-900 dark:text-white">
			{time === 0 ? "Time's up! Submit your quiz now." : 'Are you sure you want to end the quiz?'}
		</h3>
		<div class="flex flex-col gap-3 sm:flex-row sm:justify-center">
			<button
				type="button"
				class="bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 focus:ring-primary-500 inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-medium tracking-wide text-white uppercase shadow-sm transition focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
				onclick={handleSubmit}
				disabled={loading}>
				{#if loading}
					<Spinner class="mr-2" size="4" color="white" />
					Submitting...
				{:else}
					<Check class="mr-2 h-5 w-5" />
					Submit Quiz
				{/if}
			</button>

			<button
				type="button"
				class="focus:ring-primary-500 inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium tracking-wide text-slate-700 uppercase shadow-sm transition hover:bg-slate-50 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
				disabled={time === 0}
				onclick={() => (popupModal = false)}>
				<X class="mr-2 h-5 w-5" />
				Continue Quiz
			</button>
		</div>
	</div>
</Modal>
