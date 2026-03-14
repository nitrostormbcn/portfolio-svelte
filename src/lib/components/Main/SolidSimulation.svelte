<script lang="ts" module>
	const g = 10;
	let rect: HTMLDivElement | undefined = $state();
	let endSimulation = true;
	let t0 = -1;
	let solids = $state<Solid[]>([]);

	export class Solid {
		x = $state(0);
		y = $state(0);
		vx = 0;
		vy = 0;
		w = 0;
		h = 0;
		t0: number;
		isKinematic = false;
		onColision: () => void;
		elementReference = $state<HTMLElement>();
		constructor(x0: number, y0: number, onColision: () => void) {
			this.x = x0;
			this.y = y0;
			this.t0 = Date.now();
			this.onColision = onColision;
		}

		setPosition(x: number, y: number) {
			const cx = x - this.w / 2;
			const cy = y - this.h / 2;
			if (this.isKinematic) {
				const tf = Date.now();
				const dt = (tf - this.t0) / 1000;
				this.vx = (cx - this.x) / dt;
				this.vy = (cy - this.y) / dt;
				this.t0 = tf;
			}
			this.x = cx;
			this.y = cy;
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

		isInside(other: Solid) {
			const cx = this.x + this.w / 2;
			const cy = this.y + this.h / 2;
			const inX = cx <= other.x + other.w && cx >= other.x;
			const inY = cy <= other.y + other.h && cy >= other.y;
			return inX && inY;
		}
	}

	export function addSolid(solid: Solid) {
		solids.push(solid);
	}

	export function startSimulation() {
		if (endSimulation) {
			endSimulation = false;
			nextFrame();
		}
	}

	export function stopSimulation() {
		t0 = -1;
		endSimulation = true;
	}

	function nextFrame() {
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
			nextFrame();
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
		for (let i = 0; i < solids.length - 1; i++) {
			const elementI = solids[i];
			for (let j = i + 1; j < solids.length; j++) {
				const elementJ = solids[j];
				if (elementI.isInside(elementJ) && elementJ.isInside(elementI)) {
					elementI.onColision();
					elementJ.onColision();
				}
			}
		}
		t0 = tf;
		nextFrame();
	}
</script>

<div class="pointer-events-none fixed inset-5 lg:inset-20" bind:this={rect}></div>
