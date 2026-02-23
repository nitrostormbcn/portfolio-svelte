export const DEFAULT = '🌩️';
type direction = {
	emoji: string;
	numpad: string;
};
const directions = new Map<string, direction>([
	['n', { emoji: DEFAULT, numpad: '5' }],
	['w', { emoji: '⬆️', numpad: '8' }],
	['s', { emoji: '⬇️', numpad: '2' }],
	['a', { emoji: '⬅️', numpad: '4' }],
	['d', { emoji: '➡️', numpad: '6' }],
	['aw', { emoji: '↖️', numpad: '7' }],
	['wa', { emoji: '↖️', numpad: '7' }],
	['as', { emoji: '↙️', numpad: '1' }],
	['sa', { emoji: '↙️', numpad: '1' }],
	['sd', { emoji: '↘️', numpad: '3' }],
	['ds', { emoji: '↘️', numpad: '3' }],
	['wd', { emoji: '↗️', numpad: '9' }],
	['dw', { emoji: '↗️', numpad: '9' }],
	['u', { emoji: '🤜🏻', numpad: 'u' }],
	['i', { emoji: '🤜🏽', numpad: 'i' }],
	['o', { emoji: '🤜🏿', numpad: 'o' }],
	['j', { emoji: '🦶🏻', numpad: 'j' }],
	['k', { emoji: '🦶🏽', numpad: 'k' }],
	['l', { emoji: '🦶🏿', numpad: 'l' }]
]);

export class FighterInput {
	inputBuffer: string[];
	commandBuffer: string[];
	triggerCommands: string[][];
	detectedCallback: (x: string[]) => void;

	constructor(triggerCommands: string[][], callback: (x: string[]) => void) {
		this.inputBuffer = ['n', 'n'];
		this.commandBuffer = new Array(triggerCommands[0].length).fill('n');
		this.triggerCommands = [...triggerCommands];
		this.detectedCallback = callback;
	}

	push(element: string): void {
		if (!directions.has(element)) {
			return;
		}
		this.inputBuffer.push(element);
		this.inputBuffer.shift();
		this.updateCommand();
	}

	decayElement(element: string): void {
		if (!this.inputBuffer.includes(element)) {
			return;
		} else if (this.inputBuffer[1] === element) {
			this.inputBuffer[1] = 'n';
		} else if (this.inputBuffer[0] === element) {
			this.inputBuffer[0] = 'n';
		}
		this.updateCommand();
	}

	printEmoji(): string {
		// Check for diagonals
		let input = this.bufferToString();
		let value = directions.get(input);
		if (value !== undefined) {
			return value.emoji;
		}
		let mapEntry = directions.get(this.inputBuffer[1]);
		if (mapEntry !== undefined) {
			return mapEntry.emoji;
		}
		return '???';
	}

	private bufferToString(): string {
		return this.inputBuffer[0].concat(this.inputBuffer[1]);
	}

	private resolveCommand(): string {
		const diagonal = directions.get(this.bufferToString());
		if (diagonal !== undefined) {
			return diagonal.numpad; // Value is one of the diagonals
		}
		const single = directions.get(this.inputBuffer[1]);
		return single !== undefined ? single.numpad : '???2';
	}
	private updateCommand(): void {
		this.commandBuffer.push(this.resolveCommand());
		this.commandBuffer.shift();
		for (let index = 0; index < this.triggerCommands.length; index++) {
			const triggerCommand = this.triggerCommands[index];
			if (JSON.stringify(this.commandBuffer) === JSON.stringify(triggerCommand)) {
				this.detectedCallback(triggerCommand);
				return;
			}
		}
	}
}
