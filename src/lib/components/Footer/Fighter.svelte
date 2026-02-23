<script lang="ts">
	import { FighterInput, DEFAULT } from '$lib/fighterInputs.svelte';
	let displayDir: string = $state(DEFAULT);
	let fighterInputs = new FighterInput();

	function handleKeyStroke(event: KeyboardEvent) {
		if (event.repeat) {
			return;
		}
		fighterInputs.push(event.key);
		displayDir = fighterInputs.printEmoji();
	}

	function releaseKeystroke(event: KeyboardEvent) {
		fighterInputs.decayElement(event.key);
		displayDir = fighterInputs.printEmoji();
	}
</script>

<svelte:window onkeydown={handleKeyStroke} onkeyup={releaseKeystroke} />
<p class="inline">{displayDir}</p>
