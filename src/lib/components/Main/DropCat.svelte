<script lang="ts">
	import SolidSimulation, { Solid, startSimulation } from './SolidSimulation.svelte';

	let free = $state(false);
	let cat = new Solid(0, 0);

	function onTap() {
		if (!cat.elementReference) {
			console.log('No element');
			return;
		}
		const rect = cat.elementReference.getBoundingClientRect();
		free = true;
		cat.setRectangle(rect);
		startSimulation([cat]);
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
	bind:this={cat.elementReference}
	onpointerup={onTap}
	class=" {free ? 'absolute top-0 left-0' : 'inline'} text-xl lg:text-3xl">😼</span
>

<SolidSimulation></SolidSimulation>
