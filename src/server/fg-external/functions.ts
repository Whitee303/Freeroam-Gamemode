import { Player, Vehicle } from "alt-server";
import { ExternalFunctions } from "../../shared/fg-external/functions";

export class ExternalFunctionsServer extends ExternalFunctions {
	static getPlayersInRange(pos, range, dimension = 0) {
		if (pos === undefined || range === undefined) {
			throw new Error('GetPlayersInRange => pos or range is undefined');
		}

		return Player.all.filter(player => {
			return player.dimension === dimension && ExternalFunctionsServer.distance2d(pos, player.pos) <= range;
		});
	}
	static getClosestPlayer(player: Player) {
		return ExternalFunctionsServer.getClosestVectorFromGroup(player.pos, [...Player.all]);
	}
	static getClosestVehicle(player: Player) {
		return ExternalFunctionsServer.getClosestVectorFromGroup(player.pos, [...Vehicle.all]);
	}
	static spawnPlayerInRandomPosition(player: Player, positions: any[]) {
		const { x, y, z } = positions[ExternalFunctions.getRandomListEntry(positions)];
		player.spawn(x, y, z);
	}
}