<script lang="ts">
	import ArtCard from '$lib/components/Art/ArtCard.svelte';

	let projects: PauArt[] = [
		{ title: 'Portfolio', thumbnail: 'Svelte' },
		{ title: 'TCG Pokedex', thumbnail: 'Android' },
		{ title: 'Article 3', thumbnail: 'Other' },
		{ title: 'Article 3', thumbnail: 'Other' },
		{ title: 'Article 3', thumbnail: 'Other' },
		{ title: 'Article 3', thumbnail: 'Other' },
		{ title: 'Article 3', thumbnail: 'Other' },
		{ title: 'Article 3', thumbnail: 'Other' }
	];
</script>

<div class="text-container mx-0 my-auto">
	<h1 class="mt-15 mb-5 text-center text-4xl lg:text-left lg:text-5xl">Art vault 🎨</h1>
	<div class="projects flex flex-wrap justify-center gap-20">
		{#each projects as project}
			<ArtCard {project}></ArtCard>
		{/each}
	</div>
</div>

<style>
	.projects {
		padding: 4px;
		overflow-y: auto;
	}
</style>
