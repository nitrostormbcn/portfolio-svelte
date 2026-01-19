<script lang="ts">
	import { page } from '$app/state';
	interface Props {
		href: string;
		text: string;
	}
	let { href, text }: Props = $props();

	function isSelected(route: string): boolean {
		return page.route.id === route;
	}

	function getIcon(route: string): string {
		return isSelected(route) ? 'X' : ' ';
	}
</script>

<a {href} class={isSelected(href) ? 'selected' : ''}>[{getIcon(href)}] {text}</a>

<style>
	a {
		margin: 0px 15px;
		color: var(--color-text);
		text-decoration: none;
	}

	a.selected {
		color: var(--color-primary);
		font-weight: 700;
	}

	a:hover {
		color: var(--color-primary-hover);
		font-weight: 700;
	}
</style>
