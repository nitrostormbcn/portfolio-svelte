<script lang="ts">
	import ProjectCard from '$lib/components/Project/ProjectCard.svelte';

	let projects: PauProject[] = [
		{
			title: 'Portfolio',
			description: "The very website you're on",
			logo: 'Svelte',
			pathdir: 'portfolio'
		},
		{
			title: 'TCG Pokedex',
			description: 'Scanner and search for Pokemon cards',
			logo: 'Android',
			pathdir: 'rotomdex'
		}
	];
</script>

<div class="content text-container mx-0 my-auto">
	<h1 class="justi mt-15 mb-5 text-5xl">Code vault 💾</h1>
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
