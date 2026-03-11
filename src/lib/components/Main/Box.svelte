<script>
	let wiggling = $state(false);
	function wiggle() {
		wiggling = true;
		setTimeout(() => {
			wiggling = false;
		}, 250);
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="absolute right-0 bottom-10 m-5 text-3xl {wiggling
		? 'wiggling'
		: 'rest'} pointer-events-auto"
	onclick={wiggle}
	style="transition: all 125ms;"
>
	📦
</div>

<style>
	.rest {
		rotate: 0deg;
	}
	.wiggling {
		rotate: 360deg;
	}
</style>
