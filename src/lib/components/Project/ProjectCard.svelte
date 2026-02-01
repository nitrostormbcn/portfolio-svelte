<script lang="ts">
	import DotTrail from './DotTrail.svelte';
	interface Props {
		project: PauProject;
	}
	let { project }: Props = $props();
</script>

<article>
	<img src="https://placehold.co/400x400" alt="Project thumbnail" />
	<p class="symbol">{'=>'}</p>
	<div>
		<h2>{project.title}</h2>
		<p class="description">{project.description}</p>
	</div>
	<DotTrail logo={project.logo}></DotTrail>
</article>

<style>
	img {
		width: 90px;
		border-radius: 48px;
		border: 3px solid;
	}
	.symbol {
		font-size: 3em;
		font-weight: 400;
		margin-left: 20px;
		margin-right: 20px;
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
		width: 250px;
		text-align: justify;
	}
	article {
		padding: 30px 0px;
		margin-top: -4px;
		margin-left: -4px;
		display: flex;
		align-items: center;
	}
</style>
