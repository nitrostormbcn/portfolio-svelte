<script lang="ts">
	interface Props {
		letter: string;
		onTap(): void;
	}
	let { letter, onTap }: Props = $props();
	let element: HTMLSpanElement;
	let toppled = $state(true);

	function tap() {
		if (toppled) {
			onTap();
		}
		toppled = false;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="inline-block {toppled ? 'toppled mx-2' : 'straight'}"
	onpointerup={tap}
	bind:this={element}
>
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
