<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { catObject } from '$lib/data.svelte';
	import { LinearStateMachine } from '../NavBar/Infinity/LinearStateMachine.svelte';
	import Cat7 from '$lib/assets/Cat7.png';
	import Cat71 from '$lib/assets/Cat71.png';
	import { fly } from 'svelte/transition';
	import { expoIn } from 'svelte/easing';
	const VALID_PAGES = ['main', 'code', 'art', 'about'];

	let gameStates = new LinearStateMachine(['Decoy', 'Decoy', 'Decoy', 'Hidden', 'Win']);
	let decoy = $state(false);
	let ninja = $state(false);
	let shownPage = VALID_PAGES[2];
	let ninjaSpeed = $state(0);

	let height = $state(0);
	let width = $state(0);
	let px = $state(0);
	let py = $state(0);

	afterNavigate(() => {
		if (gameStates.getCurrentState() === 'Win') {
			decoy = false;
			shownPage = '';
			return;
		}
		height = document.body.scrollHeight;
		width = document.body.scrollWidth;
		const routeRaw = page.route.id?.replace('/', '');
		const route = routeRaw === '' ? 'main' : routeRaw;
		if (gameStates.getCurrentState() === 'Decoy') {
			decoy = route === shownPage;
			ninja = false;
		} else if (gameStates.getCurrentState() === 'Hidden') {
			decoy = false;
			ninja = route === shownPage;
			ninjaSpeed = 0;
		}
		px = Math.random() * width;
		py = Math.random() * height;
	});

	function nextLevel() {
		if (gameStates.getCurrentState() === 'Hidden' && !catObject.ninjaCatFound) {
			ninjaSpeed = 1000;
			catObject.nightCatFound = true;
			catObject.total += 1;
			gameStates.nextState();
		}
		if (gameStates.getCurrentState() === 'Win') {
			decoy = false;
			ninja = false;
			shownPage = '';
			return;
		}
		gameStates.nextState();
		shownPage = getNextPage(shownPage);
		decoy = false;
	}

	function getNextPage(currentValue: string): string {
		let candidatePage = currentValue;
		while (shownPage === candidatePage) {
			candidatePage = VALID_PAGES[Math.floor(Math.random() * VALID_PAGES.length)];
		}
		return candidatePage;
	}
</script>

{#if decoy}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<img
		src={Cat71}
		alt="Cat decoy"
		transition:fly
		class="absolute size-13 cursor-pointer text-2xl"
		style="left: {px}px; top: {py}px;"
		onclick={nextLevel}
	/>
{/if}
{#if ninja}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<img
		in:fly
		out:fly={{ y: 1500, duration: ninjaSpeed, easing: expoIn }}
		src={Cat7}
		alt="Ninja cat"
		class="absolute -top-40 cursor-pointer"
		style="left: {px}px;"
		onclick={nextLevel}
	/>
{/if}
