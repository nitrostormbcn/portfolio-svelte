<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import { LinearStateMachine } from '../NavBar/Infinity/LinearStateMachine.svelte';
	const VALID_PAGES = ['main', 'code', 'art', 'about'];

	let gameStates = new LinearStateMachine(['Decoy', 'Decoy', 'Decoy', 'Hidden']);
	let show = $state(false);
	let shownPage = VALID_PAGES[2];

	let height = $state(0);
	let width = $state(0);
	let px = $state(0);
	let py = $state(0);

	afterNavigate(() => {
		height = document.body.scrollHeight;
		width = document.body.scrollWidth;
		const routeRaw = page.route.id?.replace('/', '');
		const route = routeRaw === '' ? 'main' : routeRaw;
		show = route === shownPage;
		if (show) {
			px = Math.random() * width;
			py = Math.random() * height;
		}
	});

	function nextTarget() {
		gameStates.nextState();
		shownPage = getNextPage(shownPage);
		show = false;
		console.log(shownPage, gameStates.getCurrentState());
	}

	function getNextPage(currentValue: string): string {
		let candidatePage = currentValue;
		while (shownPage === candidatePage) {
			candidatePage = VALID_PAGES[Math.floor(Math.random() * VALID_PAGES.length)];
		}
		return candidatePage;
	}
</script>

{#if show}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<span
		class="absolute cursor-pointer text-2xl"
		style="left: {px}px; top: {py}px;"
		onclick={nextTarget}>🐈‍⬛</span
	>
{/if}
