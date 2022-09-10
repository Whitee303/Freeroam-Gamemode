import { on, Player, PointBlip } from "alt-server";
import { ExternalFunctions } from '../../shared/fg-external/functions';
import { addSuggestion, broadcast } from "../chat-master/startup";
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
const PositionSpawnTable = [
    {
        x: -1368.6329345703125,
        y: 57.125274658203125,
        z: 53.6951904296875
    },
    {
        x: -666.949462890625,
        y: -135.25714111328125,
        z: 37.906982421875
    },
    {
        x: -676.7340698242188,
        y: 312.79119873046875,
        z: 83.081298828125
    },
    {
        x: 52.760440826416016,
        y: 2786.1494140625,
        z: 57.8740234375
    }
];
const { x , y , z  } = PositionSpawnTable[ExternalFunctions.getRandomListEntry(PositionSpawnTable)];
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
        player.spawn(x, y, z);
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
        addSuggestion(player, suggestions);
    }
}
HandlePlayerConnect.init();
