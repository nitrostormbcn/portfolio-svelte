<script lang="ts">
	import CatCard from './CatCard.svelte';
	import { catObject } from '$lib/data.svelte';

	let catHover: Boolean = $state(false);
	let isDragging: boolean = $state(false);
	let isAway: boolean = $state(false);

	function mouseenter() {
		catHover = true;
		isAway = false;
	}

	function mouseleave() {
		// Only dismiss the modal if it is not being dragged
		if (!isDragging) {
			catHover = false;
		}
		isAway = true;
	}

	function dismiss(e: PointerEvent) {
		if (catHover && isAway) {
			catHover = false;
		}
		if (e.pointerType === 'touch' && catHover && isAway) {
			catHover = false;
		}
		if (e.pointerType === 'touch' && !isAway) {
			isAway = true;
		}
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="relative h-16 w-16" onpointerenter={mouseenter}>
	<div class="absolute top-0 left-0 z-20 h-full w-full">
		<p class="flex h-full items-center text-center">🐈 {catObject.total}/7</p>
	</div>
	{#if catHover}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="absolute -top-1 -left-40 z-10 h-60 w-60 overflow-clip rounded-4xl border-2 border-(--color-primary) bg-gray-100 drop-shadow-md lg:-left-22"
			onmouseleave={mouseleave}
		>
			<div class="flex flex-col content-center pt-25">
				<p class="text-center">Find the</p>
				<p class="text-center">hidden cats</p>
				<p class="text-center">Hint =></p>
			</div>
			<CatCard bind:isDragging></CatCard>
		</div>
	{/if}
</div>
<svelte:window onpointerdown={dismiss} />
