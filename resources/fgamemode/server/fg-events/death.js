import { on } from "alt-server";
import { PositionSpawnTable } from "../../shared/lists/Positions";
import { ExternalFunctionsServer } from "../fg-external/functions";
export const DeadPlayers = {};
const RespawnCooldown = 5000;
new class HandleDeathEvent {
    static onPlayerDeath(player) {
        if (DeadPlayers[player.id]) {
            return;
        }
        DeadPlayers[player.id] = setTimeout(()=>{
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
    constructor(){
        on('playerDeath', HandleDeathEvent.onPlayerDeath);
    }
};
