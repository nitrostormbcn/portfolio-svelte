import { CircularArray } from '$lib/CircularArray.svelte';

const TOTAL_LEVELS = 4 * 3;
export const CORRECT_ORDER = new CircularArray(['about', 'art', 'code', 'main']);
export class OverseerTravel {
	currentLevel = $state(0);
	lastIndex: number;
	constructor() {
		this.currentLevel = 0;
		this.lastIndex = -1;
	}

	computeNextStep(currentStep: string) {
		if (this.isNext(CORRECT_ORDER.findIndex(currentStep))) {
			this.currentLevel += 1;
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
}
