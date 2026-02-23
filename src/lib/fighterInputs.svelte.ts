export const DEFAULT = '🌩️';
const MAX_LENGHT = 2;
const mixedDirs = new Map<string, string>([
	['aw', '↖️'],
	['wa', '↖️'],
	['as', '↙️'],
	['sa', '↙️'],
	['sd', '↘️'],
	['ds', '↘️'],
	['wd', '↗️'],
	['dw', '↗️']
]);
const directions = new Map<string, string>([
	['w', '⬆️'],
	['s', '⬇️'],
	['a', '⬅️'],
	['d', '➡️'],
	['u', '🤜🏻'],
	['i', '🤜🏽'],
	['o', '🤜🏿'],
	['j', '🦶🏻'],
	['k', '🦶🏽'],
	['l', '🦶🏿']
]);

export class FighterInput {
	inputBuffer: string[];
	constructor() {
		this.inputBuffer = ['n', 'n'];
	}

	push(element: string): void {
		if (!directions.has(element)) {
			return;
		}
		this.inputBuffer.push(element);
		this.inputBuffer.shift();
		if (this.inputBuffer.length > MAX_LENGHT) {
			throw 'Something went wrong ' + this.inputBuffer;
		}
	}

	decayLast(): void {
		this.inputBuffer[0] = 'n';
	}

	decayElement(element: string): void {
		if (!this.inputBuffer.includes(element)) {
			return;
		} else if (this.inputBuffer[1] === element) {
			this.inputBuffer[1] = 'n';
		} else if (this.inputBuffer[0] === element) {
			this.inputBuffer[0] = 'n';
		}
	}

	printEmoji(): string {
		// Check for diagonals
		let input = this.bufferToString();
		let value = mixedDirs.get(input);
		if (value !== undefined) {
			return value;
		}
		// Single input
		if (this.inputBuffer[1] === 'n') {
			return DEFAULT;
		}
		let mapEntry = directions.get(this.inputBuffer[1]);
		if (mapEntry === undefined) {
			return '?';
		}
		return mapEntry;
	}

	private bufferToString(): string {
		if (this.inputBuffer.length > MAX_LENGHT) {
			throw 'Something went wrong ' + this.inputBuffer;
		}
		return this.inputBuffer[0].concat(this.inputBuffer[1]);
	}
}
