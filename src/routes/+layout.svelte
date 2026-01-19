<script>
	import '../app.css';
	import NavBar from '$lib/components/NavBar/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	let { children } = $props();
</script>

<div class="page">
	<NavBar></NavBar>
		{@render children()}
	<Footer></Footer>
</div>

<style>
	:global(body) {
		margin: 0;

		font-family: 'Fira Code', monospace;
		font-optical-sizing: auto;
		font-weight: 300;
		font-style: normal;

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
