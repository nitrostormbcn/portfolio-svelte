import ToppleButton from '$lib/components/About/ToppleButton.svelte';
import { mount } from 'svelte';

export class TopplingGame {
	currentLevel: number = 0;
	levelDifficulty = [1, 2, 3, 5, 10];
	content: HTMLDivElement;
	constructor(content: HTMLDivElement) {
		this.content = content;
	}

	startGame() {
		console.log('Start game');
		this.setupLevel();
	}

	private setupLevel() {
		this.splitTextContentIn(this.levelDifficulty[this.currentLevel]);
	}

	private splitTextContentIn(sections: number) {
		const paragraphs = Array.from(this.content.children);
		const totalLetters = paragraphs.reduce(
			(previous, current) => previous + current.textContent.length,
			0
		);
		let splits = Array.from({ length: sections }, () => TopplingGame.randomIntRange(totalLetters));
		while (new Set(splits).size !== splits.length) {
			splits = Array.from({ length: sections }, () => TopplingGame.randomIntRange(totalLetters));
		}
		splits.sort((a, b) => a - b);

		const relativeSplits: number[][] = Array.from({ length: paragraphs.length }, () => []);

		for (let split of splits) {
			for (let index = 0; index < paragraphs.length; index++) {
				const paragraph = paragraphs[index];
				const elementLength = paragraph.textContent.length;
				if (split <= elementLength) {
					relativeSplits[index].push(split);
					break;
				}
				split -= paragraph.textContent.length;
			}
		}

		for (let index = 0; index < relativeSplits.length; index++) {
			const elementSplits = relativeSplits[index];
			if (elementSplits.length === 0) {
				continue;
			}
			const paragraph = paragraphs[index];
			const text = paragraph.textContent;
			paragraph.textContent = '';
			const e = document.createElement('span');
			e.textContent = text.slice(0, elementSplits[0]);
			paragraph.appendChild(e);
			for (let index = 0; index < elementSplits.length; index++) {
				let split = elementSplits[index];

				if (text.charAt(split) === ' ') {
					const t1 = text.charAt(split - 1);
					split = t1 !== '' ? split - 1 : split + 1;
				}

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

	private static randomIntRange(max: number) {
		return Math.floor(Math.random() * max);
	}
}
