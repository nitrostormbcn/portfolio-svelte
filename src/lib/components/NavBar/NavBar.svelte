<script lang="ts">
	import RocketLogo from '../icons/RocketLogo.svelte';
	import NavLink from './NavLink.svelte';
	import CatHover from './CatHover.svelte';
</script>

<nav class="navbar mx-0 my-auto w-4xl self-center">
	<a href="/">
		<RocketLogo />
	</a>
	<div class="navbar-links">
		<NavLink href="/" text="Main" />
		<NavLink href="/code" text="Code" />
		<NavLink href="/art" text="Art" />
		<NavLink href="/about" text="About" />
	</div>
	<CatHover></CatHover>
</nav>

<style>
	.navbar {
		padding: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
