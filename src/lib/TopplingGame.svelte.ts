import ToppleButton from '$lib/components/About/ToppleButton.svelte';
import { mount } from 'svelte';

export class TopplingGame {
	currentLevel: number = 0;
	currentLevelProgress: number = 0;
	levelDifficulty = [1, 2, 3, 5, 10];
	paragraphs: Element[];
	initialTexts: string[];
	endCallback: () => void;
	constructor(content: HTMLDivElement, endCallback: () => void) {
		this.paragraphs = Array.from(content.children);
		this.initialTexts = this.paragraphs.map((e) => e.textContent);
		this.endCallback = endCallback;
	}

	startGame() {
		this.currentLevelProgress = 0;
		this.currentLevel = 0;
		this.setupLevel();
	}

	newLevel() {
		this.paragraphs.map((e, i) => {
			e.textContent = this.initialTexts[i];
			return e;
		});
		this.currentLevelProgress = 0;
		this.currentLevel += 1;
		if (this.currentLevel < this.levelDifficulty.length) {
			this.setupLevel();
		} else {
			this.endCallback();
		}
	}

	private setupLevel() {
		this.splitTextContentIn(this.levelDifficulty[this.currentLevel]);
	}

	private splitTextContentIn(sections: number) {
		const relativeSplits = this.generateRelativeSplits(sections);

		for (let index = 0; index < relativeSplits.length; index++) {
			const elementSplits = relativeSplits[index];
			if (elementSplits.length === 0) continue;
			const paragraph = this.paragraphs[index];
			const text = paragraph.textContent;
			const slideSplits = Utils.slideInvalidSplits(elementSplits, text);
			paragraph.textContent = '';
			const e = document.createElement('span');
			e.textContent = text.slice(0, slideSplits[0]);
			paragraph.appendChild(e);
			for (let index = 0; index < slideSplits.length; index++) {
				mount(ToppleButton, {
					target: paragraph,
					props: {
						letter: text[slideSplits[index]],
						onTap: () => {
							this.putBackUp();
						}
					}
				});
				const e = document.createElement('span');
				e.textContent = text.slice(slideSplits[index] + 1, slideSplits[index + 1]);
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
			setTimeout(() => {
				this.newLevel();
			}, 1000);
		}
	}
}

class Utils {
	public static randomIntRange(max: number) {
		return Math.floor(Math.random() * max);
	}

	public static slideSplitOnInvalidChars(split: number, text: string) {
		const format = /[\W|_]/;
		split = split < text.length ? split : text.length - 1;
		while (format.test(text[split])) {
			split -= 1;
		}

		return split;
	}

	public static slideInvalidSplits(splits: number[], text: string): number[] {
		let slideSplits = new Array();
		for (let index = 0; index < splits.length; index++) {
			let newSplit = Utils.slideSplitOnInvalidChars(splits[index], text);
			while (slideSplits.includes(newSplit)) {
				newSplit--;
			}
			slideSplits.push(newSplit);
		}
		return slideSplits;
	}
}
