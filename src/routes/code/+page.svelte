<script lang="ts">
	import AndroidLogo from '$lib/components/icons/AndroidLogo.svelte';
	import SvelteLogo from '$lib/components/icons/SvelteLogo.svelte';

	let articles: string[] = ['Portfolio', 'TCG Pokedex', 'Article 3'];
	let descriptions: string[] = [
		"The very website you're on",
		'Scanner and search for Pokemon cards',
		'Description 3'
	];

	let logos: string[] = ['Svelte', 'Android', 'Description 3'];
</script>

<div class="content center-900">
	<h1>Code vault 💾</h1>
	<div class="projects">
		{#each articles as project, index}
			<article>
				<img src="https://placehold.co/400x400" alt="Project thumbnail" />
				<p class="symbol">{'=>'}</p>
				<div>
					<h2>{project}</h2>
					<p class="description">{descriptions[index]}</p>
				</div>
				{#each { length: 13 } as _, i}
					<p class="dot">{'·'}</p>
				{/each}
				{#if logos[index] === 'Android'}
					<AndroidLogo size="1.5em"></AndroidLogo>
				{:else if logos[index] === 'Svelte'}
					<SvelteLogo size="1.5em"></SvelteLogo>
				{/if}
				<p class="dot">{'·'}</p>
			</article>
		{/each}
	</div>
</div>

<style>
	h1 {
		font-size: 3em;
		margin-top: 2em;
		margin-bottom: 1.5em;
	}
	img {
		width: 90px;
		border-radius: 48px;
		border: 3px solid;
	}
	.symbol {
		font-size: 3em;
		font-weight: 400;
		margin-left: 20px;
		margin-right: 20px;
		margin-top: 0px;
		margin-bottom: 0px;
	}
	h2 {
		font-size: 2em;
		margin-top: 0px;
		margin-bottom: 0px;
	}
	p.description {
		font-size: 1em;
		font-weight: 600;
		margin-top: 0px;
		margin-bottom: 0px;
		width: 250px;
		text-align: justify;
	}
	.projects {
		padding: 4px;
		overflow-y: auto;
	}
	article {
		padding: 30px 0px;
		margin-top: -4px;
		margin-left: -4px;
		display: flex;
		align-items: center;
	}
	.dot {
		font-size: 3em;
		font-weight: 400;
		margin-left: 0px;
		margin-right: 0px;
		margin-top: 0px;
		margin-bottom: 0px;
	}
</style>
