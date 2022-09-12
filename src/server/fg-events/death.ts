import { log, on, Player } from "alt-server";
import { PositionSpawnTable } from "../../shared/lists/Positions";
import { ExternalFunctionsServer } from "../fg-external/functions";

export const DeadPlayers = {};
const RespawnCooldown = 5000;

new class HandleDeathEvent {
	constructor() {
		on('playerDeath', HandleDeathEvent.onPlayerDeath);
	}
	private static onPlayerDeath(player: Player) {
		if (DeadPlayers[player.id]) {
			return;
		}
		DeadPlayers[player.id] = setTimeout(() => {
			if (DeadPlayers[player.id]) {
				delete DeadPlayers[player.id];
			}
			if (!player || !player.valid) {
				return;
			}
			player.removeAllWeapons();
			ExternalFunctionsServer.spawnPlayerInRandomPosition(player, PositionSpawnTable);
		}, RespawnCooldown);
	}
};