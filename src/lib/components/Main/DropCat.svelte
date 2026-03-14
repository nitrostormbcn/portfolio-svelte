<script lang="ts">
	import { addSolid, Solid, startSimulation, stopSimulation } from './SolidSimulation.svelte';
	import { catObject } from '$lib/data.svelte';
	import { onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';

	let free = $state(false);
	let isDragging = $state(false);
	let cat = new Solid(0, 0, () => {
		console.log('Collided...');
		if (!catObject.orangeCatFound) {
			catObject.orangeCatFound = true;
			catObject.total += 1;
		}
		free = false;
	});

	onMount(() => {
		addSolid(cat);
	});

	onNavigate(() => {
		stopSimulation();
	});

	function onDragStop() {
		if (isDragging) {
			isDragging = false;
			cat.unsetKinematic();
			startSimulation();
		}
	}

	function onDragStart(e: PointerEvent) {
		isDragging = true;
		e.preventDefault();
		if (!cat.elementReference) {
			console.log('No element');
			return;
		}
		const rect = cat.elementReference.getBoundingClientRect();
		free = true;
		cat.setRectangle(rect);
		cat.setKinematic();
		cat.draw();
	}

	function onDrag(e: PointerEvent) {
		if (!isDragging) {
			return;
		}
		e.preventDefault();
		cat.setPosition(e.clientX, e.clientY);
		cat.draw();
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
	bind:this={cat.elementReference}
	onpointerdown={onDragStart}
	class=" {free ? 'absolute top-0 left-0' : 'inline'} touch-none text-xl select-none lg:text-3xl"
	>😼</span
>

<svelte:window onpointermove={onDrag} onpointerup={onDragStop} />
