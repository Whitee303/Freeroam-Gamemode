import { on, Player, PointBlip } from "alt-server";
import { PositionSpawnTable } from "../../shared/lists/Positions";
import { addSuggestion, broadcast } from "../chat-master/startup";
import { ExternalFunctionsServer } from "../fg-external/functions";
Player.prototype.init = function init() {
    this.data = {};
};
const suggestions = [
    {
        name: 'v',
        description: 'You can create your own vehicle!',
        params: [
            {
                name: 'Vehicle Name'
            }
        ]
    },
    {
        name: 'wp',
        description: 'You can spawn a weapon',
        params: [
            {
                name: 'Weapon Name'
            }
        ]
    },
    {
        name: 'dvc',
        description: 'You can destroy a vehicle'
    },
    {
        name: 'vcol',
        description: 'If you want to change the color of your vehicle, you can try this!',
        params: [
            {
                name: 'Color Number'
            }
        ]
    },
    {
        name: 'fix',
        description: "Is your vehicle damaged? Don't worry, type /fix"
    },
    {
        name: 'rcol',
        description: 'Rainbow is beautiful...'
    },
    {
        name: 'neonc',
        description: 'Turn on the neon panel under the vehicle',
        params: [
            {
                name: 'R'
            },
            {
                name: 'G'
            },
            {
                name: 'B'
            }
        ]
    },
    {
        name: 'ftune',
        description: 'Upgrade your vehicle to the maximum level!'
    }, 
];
class HandlePlayerConnect {
    static init() {
        on('playerConnect', HandlePlayerConnect.propagate);
    }
    static propagate(player) {
        let blip = new PointBlip(0.0, 0.0, 0.0);
        let playerCount = Player.all.length;
        if (playerCount == undefined) {
            return;
        }
        broadcast(`${player.name} Dołączył na serwer! Liczba graczy: ${playerCount}`, 2);
        player.init();
        player.setStreamSyncedMeta('NICKNAME', player.name);
        ExternalFunctionsServer.spawnPlayerInRandomPosition(player, PositionSpawnTable);
        if (player.isSpawned) {
            blip.sprite = 1;
            blip.category = 7;
            blip.color = 4;
            blip.scale = 0.7;
            blip.name = player.name;
            blip.shortRange = true;
            blip.attachedTo = player;
            player.model = 'mp_m_freemode_01';
            player.setWeather(1);
        }
        player.emit('fixminimap');
        addSuggestion(player, suggestions);
    }
}
HandlePlayerConnect.init();
