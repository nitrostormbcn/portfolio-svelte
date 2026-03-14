import { CircularArray } from '$lib/CircularArray.svelte';

const TOTAL_LEVELS = 4 * 3;
export const CORRECT_ORDER = new CircularArray(['about', 'art', 'code', 'main']);
export class OverseerTravel {
	finished = false;
	currentLevel = $state(0);
	lastIndex: number;
	winCallback: () => void;
	constructor(winCallback: () => void) {
		this.currentLevel = 0;
		this.lastIndex = -2;
		this.winCallback = winCallback;
		this.finished = false;
	}

	computeNextStep(currentStep: string) {
		if (this.finished) return;

		if (this.isNext(CORRECT_ORDER.findIndex(currentStep))) {
			this.currentLevel += 1;
			if (this.currentLevel >= TOTAL_LEVELS) {
				this.winCallback();
			}
		} else {
			this.currentLevel = 0;
		}
		this.lastIndex = CORRECT_ORDER.findIndex(currentStep);
	}

	private isNext(index: number): boolean {
		return CORRECT_ORDER.nextIndex(this.lastIndex) === index;
	}

	getProgress(): number {
		return this.currentLevel / TOTAL_LEVELS;
	}

	toString(): string {
		return `Overseer: CL: ${this.currentLevel}, LI: ${this.lastIndex}`;
	}

	win() {
		this.currentLevel = 0;
		this.lastIndex = -2;
		this.finished = true;
	}
}
