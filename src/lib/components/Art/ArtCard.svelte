<script lang="ts">
	interface Props {
		project: PauArt;
	}
	let { project }: Props = $props();
</script>

<article>
	<img
		class="aspect-square rounded-4xl"
		src="https://placehold.co/400x400"
		alt="Project thumbnail"
	/>
	<h2 class="align-middle text-center">:= {project.title}</h2>
</article>

<style>
	h2 {
		font-size: 2em;
		margin-top: 0px;
		margin-bottom: 0px;
	}
	article {
		padding: 30px 0px;
		margin-top: -4px;
		margin-left: -4px;
	}
</style>
