<script lang="ts">
	import lnLogo from '$lib/assets/InBug-Black-150.png';
	import Cat4 from '$lib/components/About/Cat4.svelte';
	import { TopplingGame } from '$lib/TopplingGame.svelte';
	import { onMount } from 'svelte';
	import { catObject } from '$lib/data.svelte';

	let content: HTMLDivElement;
	let game: TopplingGame;
	let found = $state(false);

	onMount(() => {
		game = new TopplingGame(content, () => {
			found = true;
			catObject.kpopCatFound = true;
			catObject.total += 1;
		});
		game.startGame();
	});
</script>

<div class="relative">
	<div class="text-container mt-10 flex flex-col">
		<h1 class="mt-10 mb-10 text-4xl lg:text-7xl">
			<span style="color: var(--color-primary);">Happy</span> to meet!
		</h1>
		<p class="my-1 text-justify text-xl lg:text-3xl">I'm Pau, QA Engineer @ Sanoma</p>
		<p class="my-1 text-justify text-xl lg:text-3xl">
			Industrial Engineer turned Software Developer
		</p>
		<p class="self-center">
			<a class="m-2" href="https://www.linkedin.com/in/martinezjimenezpau/" target="”_blank”"
				><img class="h-10" src={lnLogo} alt="" /></a
			>
		</p>
	</div>
	<div class="text-container mt-0 flex flex-col items-stretch" bind:this={content}>
		<p class="my-1 text-justify text-xl lg:text-3xl">Also started painting as a hobby</p>
		<p class="my-1 text-justify text-xl lg:text-3xl">
			This is a portfolio summary of some of my works BUT also a little game...
		</p>
		<h2 class="my-10 text-2xl lg:text-5xl">The game</h2>
		<p class="my-1 text-justify text-xl lg:text-3xl">
			I've hidden 7 cats in this website, and the challenge is to find them. They are very sneaky,
			so they use all their available tricks to remain out of sight, away from you.
		</p>
		<p class="my-1 text-justify text-xl lg:text-3xl">Good luck :{')'}</p>
	</div>
	<Cat4 show={found}></Cat4>
</div>
