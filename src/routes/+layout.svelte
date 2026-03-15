<script>
	import './layout.css';
	import '../app.css';
	import NavBar from '$lib/components/NavBar/NavBar.svelte';
	import Footer from '$lib/components/Footer/Footer.svelte';
	import Overseer from '$lib/components/Overseer/Overseer.svelte';
	import NinjaSpawn from '$lib/components/Ninja/NinjaSpawn.svelte';

	let { children } = $props();
</script>

<div class="page relative justify-center">
	<NavBar />
	{@render children()}
	<Footer />
</div>

<Overseer></Overseer>
<NinjaSpawn></NinjaSpawn>

<style>
	:global(body) {
		font-family: 'Fira Code', monospace;
		font-variant-ligatures: common-ligatures;
		font-feature-settings:
			'liga' 1,
			'calt' 1;
		font-optical-sizing: auto;
		font-weight: 400;
		color: var(--color-text);
		background: var(--color-bg);
	}

	.page {
		min-height: 100dvh;
		margin: 0;
		display: grid;
		grid-template-rows: auto 1fr auto;
		grid-template-columns: 100%;
		justify-items: center;
	}
</style>
