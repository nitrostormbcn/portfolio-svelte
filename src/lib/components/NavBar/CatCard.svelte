<script lang="ts">
	import { catObject } from '$lib/data.svelte';
	import { onMount } from 'svelte';

	let card: any = $state();
	let { isDragging = $bindable() } = $props();
	let x: number = $state(0);
	let x0: number = $state(0);

	onMount(() => {
		if (catObject.chopperCatFound) {
			card.style.left = '120px';
		}
	});

	function starDrag(event: MouseEvent) {
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
			if (xf <= 120) {
				xf = 120;
				catFound();
			}
			if (xf >= 220) {
				xf = 220;
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

	$inspect(catObject);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	bind:this={card}
	onmousedown={starDrag}
	class="unselectable absolute h-30 w-30 rounded-md bg-gray-300"
	style="top: 90px; left: 220px;"
>
	Hola
</div>

<svelte:window onmouseup={endDrag} onmousemove={onDrag} />

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
