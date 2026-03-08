<script lang="ts" module>
	const g = 10;
	let groundY = $state(0);
	let t0 = 0;

	export class Solid {
		x = $state(0);
		y = $state(0);
		vx = 0;
		vy = 0;
		w = 0;
		h = 0;
		elementReference = $state<HTMLElement>();
		constructor(x0: number, y0: number) {
			this.x = x0;
			this.y = y0;
		}
	}

	export function startSimulation(solids: Solid[]) {
		requestAnimationFrame((tf) => {
			mainLoop(tf, solids);
		});
	}

	function mainLoop(tf: DOMHighResTimeStamp, solids: Solid[]) {
		solids.forEach((o) => {
			let dt = (tf - t0) / 1000;

			o.vy = o.vy + g + dt;
			o.y = o.y + o.vy * dt;

			if (o.y + o.h >= groundY && o.vy >= 0) {
				o.vy = -0.6 * o.vy;
				o.y = groundY - o.h;
			}
			if (o.elementReference) {
				o.elementReference.style.transform = 'translate(' + o.x + 'px,' + o.y + 'px)';
			}
			t0 = tf;
			requestAnimationFrame((tf) => {
				mainLoop(tf, solids);
			});
		});
	}
</script>

<svelte:window bind:innerHeight={groundY} />
