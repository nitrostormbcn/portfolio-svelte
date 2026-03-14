<script lang="ts">
	import DropCat from '$lib/components/Main/DropCat.svelte';
	import Box from '$lib/components/Main/Box.svelte';
	import SolidSimulation from '$lib/components/Main/SolidSimulation.svelte';
</script>

<div class="content text-container my-auto">
	<h1 class="mb-10 text-2xl lg:text-7xl">
		This is <span style="color: var(--color-primary);">Nitrostorm</span>'s project vault!
	</h1>
	<p class="text-xl lg:text-3xl">
		You'll find some cool code projects, some art I made, and maybe some hidden cats<DropCat
		></DropCat>
	</p>
</div>

<div class="pointer-events-none fixed inset-5 lg:inset-20">
	<Box></Box>
</div>

<SolidSimulation></SolidSimulation>

<style>
	.content {
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
	}
</style>
