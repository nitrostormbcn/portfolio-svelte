<script lang="ts">
	import ProjectCard from '$lib/components/Code/ProjectCard.svelte';

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

<div class="text-container my-auto">
	<h1 class="mt-15 mb-5 text-center text-4xl lg:text-left lg:text-5xl">Code vault 💾</h1>
	<div class="projects flex, flex-wrap justify-center gap-20">
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
