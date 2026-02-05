<script lang="ts">
	import ArtCard from '$lib/components/Project/ArtCard.svelte';

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

<div class="content mx-0 my-auto w-4xl">
	<h1 class="justi mt-15 mb-5 text-5xl">Art vault 🎨</h1>
	<div class="projects flex flex-wrap justify-between gap-20">
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
