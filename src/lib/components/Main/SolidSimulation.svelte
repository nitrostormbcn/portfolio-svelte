<script lang="ts" module>
	import { draw } from 'svelte/transition';

	const g = 10;
	let groundY = $state(0);
	let wallX = $state(0);
	let t0: number;
	let isSimulationRunning = false;

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
		if (isSimulationRunning) {
			return;
		}
		nextFrame(solids);
		isSimulationRunning = true;
	}

	function nextFrame(solids: Solid[]) {
		requestAnimationFrame((tf) => {
			mainLoop(tf, solids);
		});
	}

	function mainLoop(tf: DOMHighResTimeStamp, solids: Solid[]) {
		if (!t0) {
			t0 = tf;
			nextFrame(solids);
		}
		const dt = (tf - t0) / 1000;
		solids.forEach((o) => {
			if (o.isKinematic) {
				return;
			}
			o.vy = o.vy + g + dt;
			o.x = o.x + o.vx * dt;
			o.y = o.y + o.vy * dt;
			if (o.y + o.h >= groundY && o.vy >= 0) {
				o.vy = -0.4 * o.vy;
				o.vx = 0.8 * o.vx
				o.y = groundY - o.h;
			}
			if (o.x + o.w >= wallX && o.vx >= 0) {
				o.vx = -0.4 * o.vx;
				o.x = wallX - o.w;
			}
			if (o.x <= 0 && o.vx <= 0) {
				o.vx = -0.8 * o.vx;
				o.x = 0;
			}
			if (o.y <= 0 && o.vy <= 0) {
				o.vy = -0.8 * o.vy;
				o.y = 0;
			}
			o.draw();
		});
		t0 = tf;
		nextFrame(solids);
	}
</script>

<svelte:window bind:innerHeight={groundY} bind:innerWidth={wallX} />
