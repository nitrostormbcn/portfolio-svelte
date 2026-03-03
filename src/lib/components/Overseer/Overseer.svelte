<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { OverseerTravel, CORRECT_ORDER } from '$lib/OverseerTravel.svelte';

	let overseer = new OverseerTravel();

	afterNavigate(() => {
		const routeRaw = page.route.id?.replace('/', '');
		const route = routeRaw === '' ? 'main' : routeRaw;
		if (route && CORRECT_ORDER.includes(route)) {
			overseer.computeNextStep(route);
		}
	});

	let progress = $derived(overseer.getProgress());
	$inspect(progress);
</script>
