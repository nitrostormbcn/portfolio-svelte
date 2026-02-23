<script lang="ts">
	import { catObject } from '$lib/data.svelte';
	import { FighterInput, DEFAULT } from '$lib/fighterInputs.svelte';
	let displayDir: string = $state(DEFAULT);
	let fighterInputs = new FighterInput(
		[
			['2', '3', '6', 'u'],
			['2', '3', '6', 'i'],
			['2', '3', '6', 'o']
		],
		(triggeredCommand) => {
			console.log(triggeredCommand[3]);
			if (!catObject.hadoukenCatFound) {
				catObject.hadoukenCatFound = true;
				catObject.total += 1;
			}
		}
	);

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
