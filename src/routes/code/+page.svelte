<script lang="ts">
	import ProjectCard from '$lib/components/Project/ProjectCard.svelte';

	let projects: PauProject[] = [
		{ title: 'Portfolio', description: "The very website you're on", logo: 'Svelte' },
		{ title: 'TCG Pokedex', description: 'Scanner and search for Pokemon cards', logo: 'Android' },
		{ title: 'Article 3', description: 'Description 3', logo: 'Other' }
	];
</script>

<div class="content center-900">
	<h1>Code vault 💾</h1>
	<div class="projects">
		{#each projects as project}
			<ProjectCard {project}></ProjectCard>
		{/each}
	</div>
</div>

<style>
	h1 {
		font-size: 3em;
		margin-top: 2em;
		margin-bottom: 1.5em;
	}
	.projects {
		padding: 4px;
		overflow-y: auto;
	}
</style>
