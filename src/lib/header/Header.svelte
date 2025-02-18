<script>
	import { enhance } from '$app/forms';
	import { DarkMode } from 'flowbite-svelte';
	let { pathname, userData } = $props();
	let isMenuOpen = $state(false);

	async function handleSignOut() {
		return async ({}) => {
			window.location.href = '/';
		};
	}

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<nav
	class={`fixed top-0 z-50 w-full bg-slate-900 text-white shadow-lg dark:bg-gray-900 ${pathname === '/quiz' ? 'hidden' : ''}`}>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<div class="flex items-center">
				<a href="/" class="flex items-center space-x-2">
					<span class="text-2xl font-bold tracking-tight">Quizzy</span>
				</a>
			</div>

			<div class="flex items-center">
				<!-- Desktop menu -->
				<div class="hidden sm:flex sm:items-center sm:space-x-8">
					<a
						href="/"
						class="hover:text-primary-400 dark:hover:text-primary-300 transition-colors {pathname ===
						'/'
							? 'text-primary-500 dark:text-primary-400'
							: ''}">
						Home
					</a>
					<a
						href="/quiz"
						class="hover:text-primary-400 dark:hover:text-primary-300 transition-colors {pathname ===
						'/quiz'
							? 'text-primary-500 dark:text-primary-400'
							: ''}">
						Quiz
					</a>
					{#if userData?.username}
						<div class="flex items-center space-x-4">
							<span class="text-sm text-slate-300 dark:text-gray-300">Hi, {userData.username}</span>
							<form method="POST" use:enhance={handleSignOut} action="/login/signout">
								<button
									type="submit"
									class="bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 focus:ring-primary-500 rounded-lg px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:outline-none">
									Sign Out
								</button>
							</form>
						</div>
					{:else}
						<a
							href="/login"
							class="bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 focus:ring-primary-500 rounded-lg px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:outline-none">
							Login/Signup
						</a>
					{/if}
				</div>

				<!-- Dark mode toggle and mobile menu button -->
				<div class="flex items-center sm:ml-8">
					<DarkMode class="text-primary-500 dark:text-primary-400" />
					<button
						type="button"
						class="focus:ring-primary-500 ml-4 inline-flex items-center justify-center rounded-md p-2 hover:bg-slate-800 focus:ring-2 focus:outline-none focus:ring-inset sm:hidden"
						onclick={toggleMenu}
						aria-expanded={isMenuOpen}>
						<span class="sr-only">Open main menu</span>
						<svg
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true">
							{#if isMenuOpen}
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							{:else}
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
							{/if}
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Mobile menu -->
	{#if isMenuOpen}
		<div class="sm:hidden" id="mobile-menu">
			<div class="space-y-1 px-4 pt-2 pb-3">
				<a
					href="/"
					class="block rounded-md px-3 py-2 text-base {pathname === '/'
						? 'text-primary-500 dark:text-primary-400 bg-slate-800 dark:bg-gray-800'
						: 'hover:bg-slate-800 dark:hover:bg-gray-800'}">
					Home
				</a>
				<a
					href="/quiz"
					class="block rounded-md px-3 py-2 text-base {pathname === '/quiz'
						? 'text-primary-500 dark:text-primary-400 bg-slate-800 dark:bg-gray-800'
						: 'hover:bg-slate-800 dark:hover:bg-gray-800'}">
					Quiz
				</a>
				{#if userData?.username}
					<div class="mt-2 border-t border-slate-700 pt-4 dark:border-gray-700">
						<div class="px-3 text-sm text-slate-300 dark:text-gray-300">
							Hi, {userData.username}
						</div>
						<form method="POST" use:enhance={handleSignOut} action="/login/signout" class="mt-2">
							<button
								type="submit"
								class="bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 w-full rounded-lg px-4 py-2 text-sm font-medium">
								Sign Out
							</button>
						</form>
					</div>
				{:else}
					<a
						href="/login"
						class="bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-800 block w-full rounded-lg px-4 py-2 text-center text-sm font-medium">
						Login/Signup
					</a>
				{/if}
			</div>
		</div>
	{/if}
</nav>
