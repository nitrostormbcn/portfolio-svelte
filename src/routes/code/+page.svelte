<script lang="ts">
	import ProjectCard from '$lib/components/Project/ProjectCard.svelte';

	let projects: PauProject[] = [
		{ title: 'Portfolio', description: "The very website you're on", logo: 'Svelte' },
		{ title: 'TCG Pokedex', description: 'Scanner and search for Pokemon cards', logo: 'Android' },
		{ title: 'Article 3', description: 'Description 3', logo: 'Other' }
	];
</script>

<div class="content mx-0 my-auto w-4xl">
	<h1 class="justi text-5xl mb-5 mt-15">Code vault 💾</h1>
	<div class="projects">
		{#each projects as project}
			<ProjectCard {project}></ProjectCard>
		{/each}
	</div>
</div>

<style>
	.projects {
		padding: 4px;
		overflow-y: auto;
	}
</style>
