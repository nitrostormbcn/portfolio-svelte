import ToppleButton from '$lib/components/About/ToppleButton.svelte';
import { mount } from 'svelte';

export class TopplingGame {
	currentLevel: number = 0;
	currentLevelProgress: number = 0;
	levelDifficulty = [1, 2, 3, 5, 10];
	paragraphs: Element[];
	initialTexts: string[];
	constructor(content: HTMLDivElement) {
		this.paragraphs = Array.from(content.children);
		this.initialTexts = this.paragraphs.map((e) => e.textContent);
	}

	startGame() {
		console.log('Start game');
		this.currentLevelProgress = 0;
		this.currentLevel = 0;
		this.setupLevel();
	}

	newLevel() {
		console.log('New level');
		this.paragraphs.map((e, i) => {
			e.textContent = this.initialTexts[i];
			return e;
		});
		this.currentLevelProgress = 0;
		this.currentLevel += 1;
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
					props: {
						letter: text.charAt(split),
						onTap: () => {
							this.putBackUp();
						}
					}
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

	private putBackUp() {
		this.currentLevelProgress += 1;
		if (this.currentLevelProgress >= this.levelDifficulty[this.currentLevel]) {
			this.newLevel();
		}
	}
}

class Utils {
	public static randomIntRange(max: number) {
		return Math.floor(Math.random() * max);
	}

	public static slideSplitOnSpaces(split: number, text: string) {
		if (text.charAt(split) === ' ') {
			const t1 = text.charAt(split - 1);
			return t1 !== '' ? split - 1 : split + 1;
		}
		return split;
	}
}
