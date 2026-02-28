<script lang="ts">
	interface Props {
		letter: string;
		onTap(): void;
	}
	let { letter, onTap }: Props = $props();
	let element: HTMLSpanElement;

	function tap() {
		if (element.classList.contains('toppled')) {
			onTap();
		}
		element.classList.remove('toppled', 'mx-2');
		element.classList.add('straight');
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="toppled mx-2 inline-block" onpointerup={tap} bind:this={element}>
	{letter}
</div>

<style>
	div {
		transition: all 0.3s ease-in;
	}

	div.toppled {
		transform: rotate(90deg);
	}

	div.straight {
		transform: rotate(0deg);
	}
</style>
