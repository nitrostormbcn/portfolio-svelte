<script lang="ts" module>
	import Box from './Box.svelte';
	const g = 10;
	let rect: HTMLDivElement | undefined = $state();
	let endSimulation = true;
	let t0 = -1;

	export class Solid {
		x = $state(0);
		y = $state(0);
		vx = 0;
		vy = 0;
		w = 0;
		h = 0;
		t0: number;
		isKinematic = false;
		elementReference = $state<HTMLElement>();
		constructor(x0: number, y0: number) {
			this.x = x0;
			this.y = y0;
			this.t0 = Date.now();
		}

		setPosition(x: number, y: number) {
			if (this.isKinematic) {
				const tf = Date.now();
				const dt = (tf - this.t0) / 1000;
				this.vx = (x - this.x) / dt;
				this.vy = (y - this.y) / dt;
				this.t0 = tf;
			}
			this.x = x;
			this.y = y;
		}

		setPositionAndSize(x: number, y: number, w: number, h: number) {
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
		}

		setRectangle(rect: DOMRect) {
			this.setPositionAndSize(rect.x, rect.y, rect.width, rect.height);
		}

		draw() {
			if (this.elementReference) {
				this.elementReference.style.transform = 'translate(' + this.x + 'px,' + this.y + 'px)';
			}
		}

		setKinematic() {
			this.isKinematic = true;
		}

		unsetKinematic() {
			this.isKinematic = false;
		}
	}

	export function startSimulation(solids: Solid[]) {
		if (endSimulation) {
			endSimulation = false;
			nextFrame(solids);
		}
	}

	export function stopSimulation() {
		t0 = -1;
		endSimulation = true;
	}

	function nextFrame(solids: Solid[]) {
		requestAnimationFrame((tf) => {
			mainLoop(tf, solids);
		});
	}

	function mainLoop(tf: DOMHighResTimeStamp, solids: Solid[]) {
		if (endSimulation) {
			t0 = -1;
			return;
		}
		if (t0 < 0) {
			t0 = tf;
			nextFrame(solids);
			return;
		}
		if (!rect) return;
		let world = rect.getBoundingClientRect();
		const dt = (tf - t0) / 1000;
		solids.forEach((o) => {
			if (o.isKinematic) {
				return;
			}
			o.vy = o.vy + g + dt;
			o.x = o.x + o.vx * dt;
			o.y = o.y + o.vy * dt;
			if (o.y + o.h >= world.bottom && o.vy >= 0) {
				o.vy = -0.4 * o.vy;
				o.vx = 0.8 * o.vx;
				o.y = world.bottom - o.h;
			}
			if (o.x + o.w >= world.right && o.vx >= 0) {
				o.vx = -0.4 * o.vx;
				o.x = world.right - o.w;
			}
			if (o.x <= world.left && o.vx <= 0) {
				o.vx = -0.8 * o.vx;
				o.x = world.left;
			}
			if (o.y <= world.top && o.vy <= 0) {
				o.vy = -0.8 * o.vy;
				o.y = world.top;
			}
			o.draw();
		});
		t0 = tf;
		nextFrame(solids);
	}
</script>

<div class="pointer-events-none fixed inset-5 lg:inset-20" bind:this={rect}>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<Box></Box>
</div>
