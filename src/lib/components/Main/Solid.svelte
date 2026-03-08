<script lang="ts" module>
	export class Solid {
		x = $state(0);
		y = $state(0);
		vx = 0;
		vy = 0;
		w = 0;
		h = 0;
		constructor(x0: number, y0: number) {
			this.x = x0;
			this.y = y0;
		}
	}
</script>
