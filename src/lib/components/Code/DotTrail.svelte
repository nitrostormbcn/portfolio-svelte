<script lang="ts">
	import AndroidLogo from '$lib/components/Icons/AndroidLogo.svelte';
	import HoverDot from './HoverDot.svelte';
	import SvelteLogo from '$lib/components/Icons/SvelteLogo.svelte';
	interface Props {
		logo: Logo;
	}
	let { logo }: Props = $props();
</script>

{#each { length: 13 } as _, i}
	<HoverDot></HoverDot>
{/each}
{#if logo === 'Android'}
	<AndroidLogo size="1.5em"></AndroidLogo>
{:else if logo === 'Svelte'}
	<SvelteLogo size="1.5em" extraClasses="hidden lg:inline"></SvelteLogo>
{:else}
	<HoverDot></HoverDot>
{/if}
<HoverDot></HoverDot>
