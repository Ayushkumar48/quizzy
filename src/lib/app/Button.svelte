<script>
	import { goto } from '$app/navigation';

	let { href, children, className } = $props();
</script>

<button
	onclick={() => goto(href)}
	class={className +
		' w-full rounded-md px-8 py-1.5 text-white shadow-lg ring-1 ring-slate-300 duration-150 ease-in-out'}
>
	{@render children()}
</button>
