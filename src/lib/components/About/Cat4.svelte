<script lang="ts">
	import cat41 from '$lib/assets/Cat41.png';
	import cat42 from '$lib/assets/Cat42.png';
	import cat43 from '$lib/assets/Cat43.png';
	import cat44 from '$lib/assets/Cat44.png';
	import { blur } from 'svelte/transition';

	let { show = false } = $props();
	let enable = $state(true);

	$effect(() => {
		if (show) {
			setTimeout(() => {
				enable = false;
			}, 5000);
		}
	});
	$inspect(show);
</script>

{#if enable && show}
	<div
		transition:blur={{ duration: 2000 }}
		class="animate absolute top-[50%] left-[50%] -translate-1/2 overflow-hidden drop-shadow-lg"
		style="width: 200px; height: 200px;"
	>
		<img src={cat41} alt="cat41" class="absolute" />
		<div class="gradient41 absolute"></div>
		<img src={cat42} alt="cat42" class="absolute" />
		<div class="gradient42 absolute"></div>
		<img src={cat43} alt="cat43" class="absolute" />
		<div class="gradient43 absolute"></div>
		<img src={cat44} alt="cat44" class="absolute" />
		<div class="gradient44 absolute"></div>
	</div>
{/if}

<style>
	.gradient41 {
		width: 400px;
		height: 400px;
		background: linear-gradient(
			60deg,
			oklch(0.713 0.111 251),
			oklch(0.335 0.178 263),
			oklch(0.554 0.186 332)
		);
		animation: gradientMove 1s linear infinite;
		mask-image: url('$lib/assets/Cat41.png');
		mix-blend-mode: screen;
		opacity: 1;
	}
	.gradient42 {
		width: 400px;
		height: 400px;
		background: linear-gradient(
			120deg,
			oklch(62.812% 0.16239 253.194),
			oklch(45.575% 0.25336 263.8),
			oklch(45.559% 0.19743 333.664)
		);
		animation: gradientMove 2s linear infinite;
		mask-image: url('$lib/assets/Cat42.png');
		mix-blend-mode: overlay;
		opacity: 1;
	}

	.gradient43 {
		width: 400px;
		height: 400px;
		background: linear-gradient(
			165deg,
			oklch(0% 0 0) 25%,
			oklch(100% 0.00011 271.152),
			oklch(0% 0 0) 75%
		);
		animation: gradientMove 2s linear infinite;
		mask-image: url('$lib/assets/Cat43.png');
		mix-blend-mode: screen;
		opacity: 0.7;
	}

	.gradient44 {
		width: 400px;
		height: 400px;
		background: linear-gradient(
			220deg,
			oklch(0% 0 0) 40%,
			oklch(100% 0.00011 271.152),
			oklch(0% 0 0) 60%
		);
		animation: gradientMove 3s linear infinite;
		mask-image: url('$lib/assets/Cat44.png');
		mix-blend-mode: multiply;
		opacity: 0.5;
	}

	.animate {
		animation: movve 3s ease-in-out 1 0.5s;
		/* filter: blur(5px); */
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
