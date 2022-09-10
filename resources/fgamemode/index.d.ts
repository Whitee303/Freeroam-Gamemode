import alt, { Player } from 'alt-server';

declare module 'alt-server' {
	export interface Player {
		cash?: number;
		bank?: number;

		// You must declare your function interfaces.
		addToCash(value: number): boolean;
		addToBank(value: number): boolean;
	}
}