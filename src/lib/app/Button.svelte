<script>
	import { goto } from '$app/navigation';
	let { href, children, className = '', disabled = false } = $props();

	function handleClick() {
		if (!disabled && href) {
			goto(href);
		}
	}
</script>

<button
	{disabled}
	on:click={handleClick}
	class={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 ease-in-out focus:ring-2 focus:ring-offset-2 focus:outline-none ${disabled ? 'cursor-not-allowed opacity-60' : 'hover:brightness-110 active:translate-y-0.5'} ${className}`}>
	{@render children()}
</button>
