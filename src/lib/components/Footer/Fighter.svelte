<script lang="ts">
	const DEFAULT = '🌩️';
	const mixedDirs = new Map<string, string>([
		['⬅️⬆️', '↖️'],
		['⬆️⬅️', '↖️'],
		['⬅️⬇️', '↙️'],
		['⬇️⬅️', '↙️'],
		['⬇️➡️', '↘️'],
		['➡️⬇️', '↘️'],
		['⬆️➡️', '↗️'],
		['➡️⬆️', '↗️']
	]);
	const directions = new Map<string, string>([
		['w', '⬆️'],
		['s', '⬇️'],
		['a', '⬅️'],
		['d', '➡️'],
		['u', '🤜🏻'],
		['i', '🤜🏽'],
		['o', '🤜🏿'],
		['j', '🦶🏻'],
		['k', '🦶🏽'],
		['l', '🦶🏿']
	]);
	let displayDir: string = $state(DEFAULT);
	let currentDir: string = $state(DEFAULT);
	let lastDir: string = $state(DEFAULT);
	let timeout: number;

	function resetTimeout() {
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(() => {
			currentDir = DEFAULT;
			displayDir = DEFAULT;
		}, 500);
	}

	function handleKeyStroke(event: KeyboardEvent) {
		const temp = directions.get(event.key);
		if (temp === undefined) {
			return;
		}
		if (timeout) {
			clearTimeout(timeout);
		}
		lastDir = currentDir;
		currentDir = temp;

		const chord = currentDir.concat(lastDir);
		const mixedDir = mixedDirs.get(chord);

		if (mixedDir === undefined) {
			displayDir = currentDir;
		} else {
			displayDir = mixedDir;
		}
	}

	function releaseKeystroke(event: KeyboardEvent) {
		let temp = directions.get(event.key);
		if (temp === undefined) {
			return;
		}
		if (lastDir === temp) {
			displayDir = currentDir;
		}
		lastDir = DEFAULT;
		resetTimeout();
	}
</script>

<svelte:window onkeydown={handleKeyStroke} onkeyup={releaseKeystroke} />
<p class="inline">{displayDir}</p>
