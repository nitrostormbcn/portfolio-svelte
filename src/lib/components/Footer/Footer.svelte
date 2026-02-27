<script lang="ts">
	import SvelteLogo from '$lib/components/icons/SvelteLogo.svelte';
	import Fighter from './Fighter.svelte';
	import cat2 from '$lib/assets/Cat2.png';
	import cat21 from '$lib/assets/Cat21.png';
	import cat22 from '$lib/assets/Cat22.png';
	import cat23 from '$lib/assets/Cat23.png';
	import { fly, blur } from 'svelte/transition';
	import { linear } from 'svelte/easing';

	let ball = $state(cat21);
	let visible = $state(false);
	let shoot = $state(false);
	function onTrigger(level: string) {
		switch (level) {
			case 'u':
				ball = cat21;
				break;
			case 'i':
				ball = cat22;
				break;
			case 'o':
				ball = cat23;
				break;
			default:
				break;
		}
		visible = true;
		shoot = true;
		setTimeout(() => {
			shoot = false;
		}, 200);
	}
</script>

<footer class="std-container mx-0 my-auto">
	Made by Nitrostorm <Fighter ontrigger={onTrigger} /> with Svelte <SvelteLogo></SvelteLogo>
</footer>

{#if visible}
	<div class="absolute bottom-0" transition:fly={{ x: -300, duration: 200 }}>
		<img src={cat2} alt="Cat 2" />
	</div>
{/if}
{#if shoot}
	<img
		src={ball}
		alt="Cat fireball 1"
		class="absolute bottom-10 left-25"
		in:blur={{ duration: 50, delay: 150 }}
		out:fly={{ x: 2500, duration: 1000, easing: linear, opacity: 100 }}
	/>
{/if}

<style>
	footer {
		padding: 30px;
		text-align: center;
	}
</style>
