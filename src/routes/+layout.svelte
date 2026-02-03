<script>
	import './layout.css';
	import '../app.css';
	import NavBar from '$lib/components/NavBar/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<div class="page justify-center">
	<NavBar />
	{@render children()}
	<Footer />
</div>

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
		min-height: 100vh;
		margin: 0;
		display: grid;
		grid-template-rows: auto 1fr auto;
	}
</style>
