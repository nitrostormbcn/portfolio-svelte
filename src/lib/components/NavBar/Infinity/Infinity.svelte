<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { blur } from 'svelte/transition';
	import cat3 from '$lib/assets/Cat3.png';
	import { LinearStateMachine } from '$lib/components/NavBar/Infinity/LinearStateMachine.svelte';
	import { catObject } from '$lib/data.svelte';
	import Dot from './Dot.svelte';

	let clickDepth = $state(0);
	let states = new LinearStateMachine(['start', 'infinity', 'domain', 'dismissed']);

	let width = $derived(94 / (clickDepth === 0 ? 1 : clickDepth));
	let interceptClicks: boolean = $derived(
		['infinity', 'domain'].includes(states.getCurrentState())
	);

	afterNavigate(() => {
		if (states.getCurrentState() === 'dismissed') {
			return;
		}
		if (page.route.id?.includes('about')) {
			if (width <= 1) {
				states.setCurrentState('infinity');
				return;
			}
			clickDepth += 1;
		} else {
			clickDepth = 0;
			states.setCurrentState('start');
		}
	});

	function domain() {
		states.setCurrentState('domain');
		catObject.gojoCatFound = true;
		catObject.total += 1;
		setTimeout(() => {
			states.setCurrentState('dismissed');
		}, 3000);
	}
</script>

<svelte:head>
	<link rel="preload" as="image" href={cat3} />
</svelte:head>

<div
	class="absolute flex h-15 w-full items-center justify-center px-5 z-50
	lg:h-26 {interceptClicks ? 'pointer-events-auto' : 'pointer-events-none'}"
>
	{#if states.getCurrentState() === 'start'}
		<Dot clazz="bg-blue-700"></Dot>
	{/if}
	{#if states.getCurrentState() === 'start'}
		<div class="smooth h-10" style="width: {width}%;"></div>
	{:else if states.getCurrentState() === 'infinity'}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div in:blur onclick={domain} class="h-6 w-6 rounded-[50%] bg-purple-500"></div>
	{:else if states.getCurrentState() === 'domain'}
		<img transition:blur class="pt-40" src={cat3} alt="Cat 3" />
	{/if}
	{#if states.getCurrentState() === 'start'}
		<Dot clazz="bg-red-700"></Dot>
	{/if}
</div>

<style>
	.smooth {
		transition: width 200ms;
	}
</style>
