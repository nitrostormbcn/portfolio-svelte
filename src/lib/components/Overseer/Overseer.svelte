<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { OverseerTravel, CORRECT_ORDER } from '$lib/OverseerTravel.svelte';
	import { catObject } from '$lib/data.svelte';
	import cat51 from '$lib/assets/Cat51.png';
	import cat52 from '$lib/assets/Cat52.png';
	import cat53 from '$lib/assets/Cat53.png';
	import { blur } from 'svelte/transition';

	let overseer = new OverseerTravel(winCallback);

	afterNavigate(() => {
		const routeRaw = page.route.id?.replace('/', '');
		const route = routeRaw === '' ? 'main' : routeRaw;
		if (route && CORRECT_ORDER.includes(route)) {
			overseer.computeNextStep(route);
		}
	});

	let progress = $derived(overseer.getProgress());
	// let opacity = $derived(sinmap(progress, 7));
	// let hidden = $derived(progress < 1);
	let opacity = 1;
	let hidden = $state(false);

	function toggle() {
		setTimeout(() => {
			hidden = !hidden;
			toggle();
		}, 2000);
	}
	toggle();

	function sinmap(x: number, a: number): number {
		return x + Math.sin(2 * Math.PI * x) / a;
	}

	function winCallback() {
		catObject.nightCatFound = true;
		catObject.total += 1;
		setTimeout(() => {
			overseer.win();
		}, 3000);
	}
</script>

<div
	class="gradient {hidden ? 'pointer-events-none' : ''}
		   ease absolute top-0 left-0 z-50 h-full w-full overflow-clip"
	style="opacity: {opacity};"
>
	{#if !hidden}
		<div
			transition:blur={{ duration: 1000 }}
			class="shimmer absolute h-full w-full object-contain"
		></div>
		<img
			transition:blur={{ duration: 1000 }}
			src={cat51}
			alt="Cat face"
			class="absolute h-full w-full object-contain"
		/>
		<img
			transition:blur={{ duration: 1000 }}
			src={cat52}
			alt="Cat glow"
			class="absolute h-full w-full object-contain"
		/>
	{/if}
</div>

<style>
	.gradient {
		background-image: radial-gradient(rgba(0, 0, 0, 1), black);
	}

	.ease {
		transition: opacity 0.1s;
	}

	.shimmer {
		background:
			/* url($lib/assets/cat53.png), */
			linear-gradient(60deg, oklch(0.713 0.111 251), oklch(0.335 0.178 263), oklch(0.554 0.186 332));
		mask-image: url($lib/assets/Cat53.png);
		animation: gradientMove 1s linear infinite;
		mix-blend-mode: screen;
		opacity: 1;
	}
	@keyframes gradientMove {
		0% {
			background-position: 0px 0px;
		}
		25% {
			background-position: 0px -200px;
		}
		50% {
			background-position: -200px -200px;
		}
		75% {
			background-position: -200px 0px;
		}
		100% {
			background-position: -0px 0px;
		}
	}
</style>
