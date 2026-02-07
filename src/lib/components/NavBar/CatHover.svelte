<script lang="ts">
	import CatCard from './CatCard.svelte';
	let catHover: Boolean = $state(false);
	let isDragging: boolean = $state(false);

	function mouseenter() {
		catHover = true;
	}
	function mouseleave() {
		if (!isDragging) {
			catHover = false;
		}
		console.log(isDragging);
	}
</script>

<div class="relative h-16 w-16">
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="absolute top-0 left-0 z-20 h-full w-full" onmouseenter={mouseenter}>
		<p class="flex h-full items-center text-center">🐈 0/7</p>
	</div>
	{#if catHover}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="absolute -top-1 -left-22 z-10 h-60 w-60 overflow-clip rounded-4xl border-2 border-(--color-primary) bg-gray-100 drop-shadow-md"
			onmouseleave={mouseleave}
		>
			<div class="flex flex-col content-center pt-25">
				<p class="text-center">Find the</p>
				<p class="text-center">hidden cats</p>
				<p class="text-center">Hint =></p>
			</div>
			<CatCard bind:isDragging ></CatCard>
		</div>
	{/if}
</div>
