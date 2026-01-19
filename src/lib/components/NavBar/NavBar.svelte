<script lang="ts">
	import RocketLogo from '../icons/RocketLogo.svelte';
	import NavLink from './NavLink.svelte';
</script>

<nav class="navbar center-900">
	<a href="/">
		<RocketLogo />
	</a>
	<div class="navbar-links">
		<NavLink href="/" text="Main" />
		<NavLink href="/code" text="Code" />
		<NavLink href="/art" text="Art" />
		<NavLink href="/about" text="About" />
	</div>
	<div>🐈 0/7</div>
</nav>

<style>
	.navbar {
		padding: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
