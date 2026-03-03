export class CircularArray<T> {
	linearArray;
	constructor(array: T[]) {
		this.linearArray = [...array];
	}

	nextIndex(index: number): number {
		return (Math.floor(index) + 1) % this.linearArray.length;
	}

	findIndex(element: T) {
		return this.linearArray.findIndex((e) => e === element);
	}

	includes(element: T): boolean {
		return this.linearArray.includes(element);
	}
}
