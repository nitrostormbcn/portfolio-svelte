<script lang="ts">
	import { onMount } from 'svelte';
	import { addSolid, Solid } from './SolidSimulation.svelte';
	import Cat6 from '$lib/assets/Cat6.png';
	import { scale } from 'svelte/transition';
	import { catObject } from '$lib/data.svelte';

	let found = $state(false);
	let box = new Solid(0, 0, () => {
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
		if (catObject.orangeCatFound) {
			found = true;
			return;
		}
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
	<img
		class="absolute right-0 bottom-10 m-5 size-35 object-contain lg:overflow-visible lg:object-none"
		transition:scale
		src={Cat6}
		alt="Orange Cat"
	/>
{/if}

<svelte:head>
	<link rel="preload" as="image" href={Cat6} />
</svelte:head>

<style>
	.rest {
		rotate: 0deg;
	}
	.wiggling {
		rotate: 360deg;
	}
</style>
