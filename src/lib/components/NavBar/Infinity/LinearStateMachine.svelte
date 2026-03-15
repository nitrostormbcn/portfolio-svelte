<script lang="ts" module>
	export class LinearStateMachine {
		states: string[] = $state([]);
		currentState: number = $state(0);
		constructor(states: string[]) {
			this.states = [...states];
			this.currentState = 0;
		}

		getCurrentState(): string {
			return this.states[this.currentState];
		}

		setCurrentState(state: string) {
			const index = this.states.indexOf(state);
			if (index === -1) {
				throw new Error('Unexpected state');
			}
			this.currentState = index;
		}

		nextState(): string {
			this.currentState += 1;
			if (this.currentState >= this.states.length) {
				this.currentState = this.states.length - 1;
			}
			return this.states[this.currentState];
		}
	}
</script>
