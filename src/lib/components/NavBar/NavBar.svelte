<script lang="ts">
	import NavLink from './NavLink.svelte';
	import CatHover from './CatHover/CatHover.svelte';
	import logo from '$lib/assets/logo-resized.png';
	import Infinity from './Infinity/Infinity.svelte';
</script>

<nav class="navbar std-container mx-0 my-auto self-center">
	<a href="/">
		<img src={logo} alt="Logo" class="w-15" />
	</a>
	<div class="flex flex-col lg:flex-row">
		<NavLink href="/" text="Main" />
		<NavLink href="/code" text="Code" />
		<NavLink href="/art" text="Art" />
		<NavLink href="/about" text="About" />
	</div>
	<CatHover></CatHover>
</nav>

<Infinity></Infinity>

<style>
	.navbar {
		padding: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
