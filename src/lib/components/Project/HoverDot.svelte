<script lang="ts">
	let chars: String[] = ['·', '~', '*', '@', '#', '$', '%', '^', '&'];
	let index: number = $state(0);
	let intervalId: number;

	function startInterval() {
		index++;
		clearInterval(intervalId);
		intervalId = setInterval(() => {
			if (index < chars.length - 1) {
				index++;
			} else {
				index = 0;
			}
		}, 100);
	}

	function stopInterval() {
		index = 0;
		clearInterval(intervalId);
	}
</script>

<p class="dot" onmouseenter={startInterval} onmouseleave={stopInterval}>{chars[index]}</p>

<style>
	.dot {
		font-size: 3em;
		font-weight: 400;
		margin-left: 0px;
		margin-right: 0px;
		margin-top: 0px;
		margin-bottom: 0px;
	}
</style>
