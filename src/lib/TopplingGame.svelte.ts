import ToppleButton from '$lib/components/About/ToppleButton.svelte';
import { mount } from 'svelte';

export class TopplingGame {
	currentLevel: number = 0;
	levelDifficulty = [10, 2, 3, 5, 10];
	currentLevelProgress: number = 0;
	paragraphs: Element[];
	initialParagraphs: Element[];
	constructor(content: HTMLDivElement) {
		this.paragraphs = Array.from(content.children);
		this.initialParagraphs = [...this.paragraphs];
	}

	startGame() {
		console.log('Start game');
		this.setupLevel();
	}

	private setupLevel() {
		this.splitTextContentIn(this.levelDifficulty[this.currentLevel]);
	}

	private splitTextContentIn(sections: number) {
		const relativeSplits = this.generateRelativeSplits(sections);

		for (let index = 0; index < relativeSplits.length; index++) {
			const elementSplits = relativeSplits[index];
			const paragraph = this.paragraphs[index];
			if (elementSplits.length === 0) continue;

			const text = paragraph.textContent;
			paragraph.textContent = '';
			const e = document.createElement('span');
			elementSplits[0] = Utils.slideSplitOnSpaces(elementSplits[0], text);
			e.textContent = text.slice(0, elementSplits[0]);
			paragraph.appendChild(e);
			for (let index = 0; index < elementSplits.length; index++) {
				const split = Utils.slideSplitOnSpaces(elementSplits[index], text);
				const e = document.createElement('span');
				e.textContent = text.slice(split + 1, elementSplits[index + 1]);
				mount(ToppleButton, {
					target: paragraph,
					props: { letter: text.charAt(split) !== ' ' ? text.charAt(split) : '@' }
				});
				paragraph.appendChild(e);
			}
		}
	}

	private generateAbsoluteSplits(num: number): number[] {
		const totalLetters = this.paragraphs.reduce(
			(previous, current) => previous + current.textContent.length,
			0
		);
		let splits = Array.from({ length: num }, () => Utils.randomIntRange(totalLetters));
		while (new Set(splits).size !== splits.length) {
			// Reroll if there are repeated splits
			splits = Array.from({ length: num }, () => Utils.randomIntRange(totalLetters));
		}
		return splits.sort((a, b) => a - b);
	}

	private generateRelativeSplits(sections: number): number[][] {
		const splits = this.generateAbsoluteSplits(sections);
		const relativeSplits: number[][] = Array.from({ length: this.paragraphs.length }, () => []);
		for (let split of splits) {
			for (let index = 0; index < this.paragraphs.length; index++) {
				const paragraph = this.paragraphs[index];
				const elementLength = paragraph.textContent.length;
				if (split <= elementLength) {
					relativeSplits[index].push(split);
					break;
				}
				split -= paragraph.textContent.length;
			}
		}
		return relativeSplits;
	}
}

class Utils {
	public static randomIntRange(max: number) {
		return Math.floor(Math.random() * max);
	}

	public static slideSplitOnSpaces(split: number, text: string) {
		if (text.charAt(split) === ' ') {
			const t1 = text.charAt(split - 1);
			console.log(split);
			return t1 !== '' ? split - 1 : split + 1;
		}
		return split;
	}
}
