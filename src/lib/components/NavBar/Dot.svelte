<script>
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { blur } from 'svelte/transition';

	let { clazz } = $props();
	let opacity = $state(20);

	afterNavigate(() => {
		if (page.route.id?.includes('about')) {
			opacity = 100;
		} else {
			opacity = 20;
		}
	});
</script>

<div transition:blur class="h-3 w-3 rounded-[50%] {clazz}" style="opacity: {opacity}%;"></div>
