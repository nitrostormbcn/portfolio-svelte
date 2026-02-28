import ToppleButton from '$lib/components/About/ToppleButton.svelte';
import { mount } from 'svelte';

export class TopplingGame {
	currentLevel: number = 0;
	levelDifficulty = [10, 2, 3, 5, 10];
	content: HTMLDivElement;
	constructor(content: HTMLDivElement) {
		this.content = content;
	}

	startGame() {
		console.log('Start game');
		this.setupLevel();
	}

	private setupLevel() {
		for (let index = 0; index < this.levelDifficulty[this.currentLevel]; index++) {
			console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');

			const direction = TopplingGame.pickRandomLetter(this.content);
			this.injectHTML(direction);
		}
	}

	private static pickRandomLetter(content: Element): number[] {
		if (content.children.length === 0) {
			let rand = TopplingGame.randomIntRange(content.textContent.length);
			while (content.textContent[rand] === ' ') {
				rand = TopplingGame.randomIntRange(content.textContent.length);
			}
			return Array.of(rand);
		}

		const ordered = Array.from(content.children);
		const shuffled = [...ordered].sort(() => Math.random() - 0.5);
		console.log(shuffled);
		for (let index = 0; index < shuffled.length; index++) {
			const elem = shuffled[index];
			if (elem.tagName.toLowerCase() === 'div' || elem.textContent === '' || elem.textContent === ' ') {
				continue;
			}
			const rand = ordered.findIndex((value) => elem === value);
			return Array.of(rand).concat(TopplingGame.pickRandomLetter(elem));
		}
		throw new Error('Wtf happened here');
	}

	private static randomIntRange(max: number) {
		return Math.floor(Math.random() * max);
	}

	private injectHTML(direction: number[]): void {
		function injectRecursive(content: Element, direction: number[]): void {
			if (direction.length === 1) {
				content.appendChild;
				const text = content.textContent;
				const e1 = document.createElement('span');
				e1.textContent = text.slice(0, direction[0]);
				const e2 = document.createElement('span');
				e2.textContent = text.slice(direction[0] + 1, text.length);
				content.textContent = '';
				content.appendChild(e1);
				const injection = mount(ToppleButton, {
					target: content,
					props: { letter: text.charAt(direction[0]) }
				});
				content.appendChild(e2);
				return;
			}
			const e = content.children.item(direction[0]);
			if (!e) {
				throw new Error('Unexpected');
			}
			return injectRecursive(e, direction.slice(1, direction.length));
		}
		return injectRecursive(this.content, direction);
	}
}
