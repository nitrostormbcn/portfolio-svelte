<script lang="ts">
	import { onMount } from 'svelte';
	import { addSolid, Solid } from './SolidSimulation.svelte';

	let found = $state(false);
	let box = new Solid(0, 0, () => {
		console.log('Collided...');
		found = true;
	});
	let ref = $state<HTMLElement>();

	let wiggling = $state(false);
	function wiggle() {
		wiggling = true;
		setTimeout(() => {
			wiggling = false;
		}, 250);
	}

	onMount(() => {
		box.setKinematic();
		if (!ref) {
			console.log('Box not found');
			return;
		}
		box.setRectangle(ref.getBoundingClientRect());
		addSolid(box);
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if !found}
	<div
		bind:this={ref}
		class="absolute right-0 bottom-10 m-5 text-3xl {wiggling
			? 'wiggling'
			: 'rest'} pointer-events-auto"
		onclick={wiggle}
		style="transition: all 125ms;"
	>
		📦
	</div>
{/if}

{#if found}
	
{/if}

<style>
	.rest {
		rotate: 0deg;
	}
	.wiggling {
		rotate: 360deg;
	}
</style>
