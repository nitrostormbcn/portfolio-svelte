<script lang="ts">
	import { Solid } from './Solid.svelte';
	const g = 10;

	let groundY = $state(0);
	let free = $state(false);
	let element = $state<HTMLElement>();
	let cat = new Solid(0, 0);
	let t0 = 0;

	function onTap() {
		if (!element) {
			console.log('No element');
			return;
		}
		const rect = element.getBoundingClientRect();
		console.log(rect);
		free = true;
		cat.x = rect.x;
		cat.y = rect.y;
		cat.w = rect.width;
		cat.h = rect.height;
		groundY = groundY;
		requestAnimationFrame(mainLoop);
	}

	function mainLoop(tf: DOMHighResTimeStamp) {
		let dt = (tf - t0) / 1000;

		cat.vy = cat.vy + g + dt;
		cat.y = cat.y + cat.vy * dt;

		if (cat.y + cat.h >= groundY && cat.vy >= 0) {
			cat.vy = -0.6 * cat.vy;
			cat.y = groundY - cat.h;
		}
		if (element) {
			element.style.transform = 'translate(' + cat.x + 'px,' + cat.y + 'px)';
		}
		t0 = tf;
		requestAnimationFrame(mainLoop);
	}
</script>

<svelte:window bind:innerHeight={groundY} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
	bind:this={element}
	onpointerup={onTap}
	class=" {free ? 'absolute top-0 left-0' : 'inline'} text-xl lg:text-3xl">😼</span
>
