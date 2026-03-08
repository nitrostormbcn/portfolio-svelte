<script lang="ts">
	import SolidSimulation, { Solid, startSimulation } from './SolidSimulation.svelte';

	let free = $state(false);
	let isDragging = $state(false);
	let cat = new Solid(0, 0);

	function onDragStop() {
		if (isDragging) {
			isDragging = false;
			cat.unsetKinematic();
			startSimulation([cat]);
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
	class=" {free ? 'absolute top-0 left-0' : 'inline'} text-xl lg:text-3xl">😼</span
>

<SolidSimulation></SolidSimulation>

<svelte:window onpointermove={onDrag} onpointerup={onDragStop} />
