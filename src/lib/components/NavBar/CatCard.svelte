<script lang="ts">
	import { catObject } from '$lib/data.svelte';
	import { onMount } from 'svelte';
	import cat1 from '$lib/assets/Cat1.png';

	let card: any = $state();
	let { isDragging = $bindable() } = $props();
	let x: number = $state(0);
	let x0: number = $state(0);

	onMount(() => {
		if (catObject.chopperCatFound) {
			card.style.left = '-5px';
		}
	});

	function startDrag(event: MouseEvent) {
		isDragging = true;
		x = event.clientX;
		x0 = parseInt(card.style.left.replace('px', ''));
	}

	function endDrag() {
		isDragging = false;
	}

	function onDrag(event: MouseEvent) {
		if (isDragging && card && card.style) {
			let offset = event.clientX - x;
			let xf = x0 + offset;
			if (xf >= -5) {
				xf = -5;
				catFound();
			}
			if (xf <= -100) {
				xf = -100;
			}
			card.style.left = xf.toString() + 'px';
		}
	}

	function catFound() {
		if (!catObject.chopperCatFound) {
			catObject.chopperCatFound = true;
			catObject.total += 1;
		}
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	bind:this={card}
	onmousedown={startDrag}
	onpointerdown={startDrag}
	class="unselectable absolute h-30 w-30 touch-none content-center rounded-md text-center"
	style="top: 90px; left: -100px;"
>
	<img src={cat1} alt="Cat number 1" class="unselectable" draggable="false" />
</div>

<svelte:window onpointermove={onDrag} onpointerup={endDrag} />

<style>
	.unselectable {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
</style>
