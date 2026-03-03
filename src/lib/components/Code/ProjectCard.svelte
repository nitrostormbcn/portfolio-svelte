<script lang="ts">
	import DotTrail from './DotTrail.svelte';
	interface Props {
		project: PauProject;
	}
	let { project }: Props = $props();
</script>

<a href="code/{project.pathdir}" class="justify-center">
	{#await import(`$lib/assets/${project.pathdir}/hero.png`)}
		<div class="h-12 w-12 rounded-full border-4 object-contain lg:h-24 lg:w-24"></div>
	{:then { default: src }}
		<img
			{src}
			alt="Project thumbnail"
			class="h-12 w-12 rounded-full border-4 object-contain lg:h-24 lg:w-24"
		/>
	{/await}
	<p class="symbol mx-5 hidden lg:block">{'=>'}</p>
	<p class="symbol mx-1 block lg:hidden">{':'}</p>
	<div>
		<h2>{project.title}</h2>
		<p class="description w-55 lg:w-3xs">{project.description}</p>
	</div>
	<DotTrail logo={project.logo}></DotTrail>
</a>

<style>
	.symbol {
		font-size: 3em;
		font-weight: 400;
		margin-top: 0px;
		margin-bottom: 0px;
	}
	h2 {
		font-size: 2em;
		margin-top: 0px;
		margin-bottom: 0px;
	}
	p.description {
		font-size: 1em;
		font-weight: 600;
		margin-top: 0px;
		margin-bottom: 0px;
		text-align: left;
	}
	a {
		padding: 30px 0px;
		margin-top: -4px;
		margin-left: -4px;
		display: flex;
		align-items: center;
	}
</style>
