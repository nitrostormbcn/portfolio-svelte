<script lang="ts">
	interface Props {
		letter: string;
	}
	let { letter }: Props = $props();
	let element: HTMLSpanElement;

	function tap() {
		element.classList.remove('rotate-90', 'mx-2');
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="mx-2 inline-block rotate-90 bg-blue-500" onpointerup={tap} bind:this={element}>
	{letter}
</div>
