<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { OverseerTravel, CORRECT_ORDER } from '$lib/OverseerTravel.svelte';
	import { catObject } from '$lib/data.svelte';
	import cat51 from '$lib/assets/Cat51.png';
	import cat52 from '$lib/assets/Cat52.png';
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
	let opacity = $derived(sinmap(progress, 7));
	let hidden = $derived(progress < 1);

	function sinmap(x: number, a: number): number {
		return x + Math.sin(2 * Math.PI * x) / a;
	}

	function winCallback() {
		catObject.nightCatFound = true;
		catObject.total += 1;
		setTimeout(() => {
			overseer.win();
		}, 4000);
	}
</script>

<svelte:head>
	<link rel="preload" as="image" href={cat51} />
	<link rel="preload" as="image" href={cat52} />
</svelte:head>

<div
	class="gradient {hidden ? 'pointer-events-none' : ''}
		 fixed top-0 left-0 z-50 h-full w-full overflow-clip"
	style="opacity: {opacity};"
>
	{#if !hidden}
		<div
			class="ease absolute top-0 left-0 z-50 h-full w-full overflow-clip"
			transition:blur={{ duration: 1000 }}
		>
			<div
				class="shimmer absolute top-[50%] left-[50%] z-25 h-50 w-300 -translate-1/2 lg:h-100"
			></div>
			<img src={cat51} alt="Cat face" class="absolute z-30 h-full w-full object-contain" />
			<img src={cat52} alt="Cat glow" class="absolute z-35 h-full w-full object-contain blur-3xl" />
		</div>
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
		background: radial-gradient(
			oklch(91.72% 0.04103 252.873),
			oklch(90.662% 0.07503 328.95),
			oklch(96.554% 0.06236 141.637)
		);
		animation: gradientMove 1s linear infinite;
		/* mix-blend-mode: screen; */
	}
	@keyframes gradientMove {
		0% {
			background-position: 0px 0px;
		}
		25% {
			background-position: 0px -400px;
		}
		50% {
			background-position: -400px -400px;
		}
		75% {
			background-position: -400px 0px;
		}
		100% {
			background-position: -0px 0px;
		}
	}
</style>
