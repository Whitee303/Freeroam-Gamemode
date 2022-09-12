import { Vector3 } from "alt-shared";

export class ExternalFunctions {
	static randomNumber(min: number, max: number) {
		return Math.round(Math.random() * (max - min) + min);
	}
	static randomColor() {
		return Math.floor(Math.random() * 255);
	}
	static getRandomListEntry(list: any[]) {
		return ExternalFunctions.randomNumber(0, list.length - 1);
	}
	static distance(vector1: Vector3, vector2: Vector3) {
		if (vector1 === undefined || vector2 === undefined) {
			throw new Error('distance => vector1 or vector2 is undefined');
		}

		return Math.sqrt(
			Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2) + Math.pow(vector1.z - vector2.z, 2)
		);
	}
	static getClosestVectorFromGroup(pos: Vector3, arrayOfPositions: any[]) {
		arrayOfPositions.sort((a: { pos: Vector3; }, b: { pos: Vector3; }) => {
			if (a.pos && b.pos) {
				return ExternalFunctions.distance(pos, a.pos) - ExternalFunctions.distance(pos, b.pos);
			}

			return ExternalFunctions.distance(pos, a.pos) - ExternalFunctions.distance(pos, b.pos);
		});

		return arrayOfPositions[0];
	}
	static randomPositionAround(position: { x: number; y: number; z: any; }, range: number) {
		return {
			x: position.x + Math.random() * (range * 2) - range,
			y: position.y + Math.random() * (range * 2) - range,
			z: position.z
		};
	}
	static isBetween(pos: { x: number; y: number; }, vector1: { x: number; y: number; }, vector2: { x: number; y: number; }) {
		const validX = pos.x > vector1.x && pos.x < vector2.x;
		const validY = pos.y > vector1.y && pos.y < vector2.y;
		return validX && validY ? true : false;
	}
	static distance2d(vector1: { x: number; y: number; }, vector2: { x: number; y: number; }) {
		if (vector1 === undefined || vector2 === undefined) {
			throw new Error('AddVector => vector1 or vector2 is undefined');
		}

		return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2));
	}
	static getForwardVectorServer(rot: { x: number; z: any; }) {
		const z = -rot.z;
		const x = rot.x;
		const num = Math.abs(Math.cos(x));
		return {
			x: -Math.sin(z) * num,
			y: Math.cos(z) * num,
			z: Math.sin(x)
		};
	}
}
