function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object.keys(descriptor).forEach(function(key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;
    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }
    desc = decorators.slice().reverse().reduce(function(desc, decorator) {
        return decorator ? decorator(target, property, desc) || desc : desc;
    }, desc);
    var hasAccessor = Object.prototype.hasOwnProperty.call(desc, 'get') || Object.prototype.hasOwnProperty.call(desc, 'set');
    if (context && desc.initializer !== void 0 && !hasAccessor) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }
    if (hasAccessor) {
        delete desc.writable;
        delete desc.initializer;
        delete desc.value;
    }
    if (desc.initializer === void 0) {
        Object.defineProperty(target, property, desc);
        desc = null;
    }
    return desc;
}
var _class, _dec, _dec1, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29;
import { hash, Player, Vehicle, setInterval, RGBA, on, PointBlip } from "alt-server";
import { registerCmd, send } from "../chat-master/startup";
import { PedTable } from "../../shared/lists/Peds";
import { WeaponModel } from "../../shared/lists/Weapons";
import { ExternalFunctions } from '../../shared/fg-external/functions';
let CommandsHandler = ((_class = class CommandsHandler {
    static _spawnVehicle(player, args) {
        if (args.length <= 0) {
            send(player, '/v [VehicleName]');
            return;
        }
        const vehiclehash = hash(args[0]);
        const { x , y , z  } = player.pos;
        if (!vehiclehash) {
            send(player, 'The specified vehicle does not exist!');
            return;
        }
        new Promise((resolve, reject)=>{
            player['Car'] = new Vehicle(vehiclehash, x, y + 1, z, 0, 0, 0);
            resolve(player['Car']);
        }).then((vehicle)=>{
            if (vehicle instanceof Vehicle) {
                player.setIntoVehicle(vehicle, 1);
            }
        });
    }
    static giveWeapon(player, args) {
        const WeaponName = args[0];
        if (!args.length) {
            send(player, `/wp [Weapon_name]`);
            return;
        }
        if (!WeaponModel[WeaponName]) {
            send(player, `Weapon is undefined (/wp [Weapon_name])`);
        } else {
            player.giveWeapon(WeaponModel[WeaponName], 500, true);
        }
    }
    static deletePlayerVehicle(player) {
        if (player.vehicle) {
            player.vehicle.destroy();
        }
    }
    static setPlayerModel(player, args) {
        const skinName = args[0];
        if (!args.length) {
            send(player, `/skin [skin_name]`);
            return;
        }
        if (!PedTable[skinName]) {
            send(player, `Skin is undefined (/skin [Skin_Name])`);
        } else {
            send(player, "Skin name is good!");
            player.model = PedTable[skinName];
        }
    }
    static setVehicleColor(player, veh) {
        if (player.vehicle) {
            player.vehicle.primaryColor = veh[0];
            player.data.primaryColorChange = veh.primaryColor;
            if (veh > 255) {
                return;
            }
            send(player, `You change the vehicle color:{b9de16} ${player.vehicle.primaryColor}`);
        }
    }
    static repairVehicle(player, vehicle) {
        if (player.vehicle) {
            player.vehicle.repair();
        }
    }
    static rainbowColor(player) {
        if (player.vehicle) {
            if (player.data.colorChange) {
                send(player, `You turn off rainbow color mode.`);
                clearInterval(player.data.colorChange);
                player.data.colorChange = null;
                return;
            }
            player.data.colorChange = setInterval(()=>{
                const r = ExternalFunctions.randomColor();
                const g = ExternalFunctions.randomColor();
                const b = ExternalFunctions.randomColor();
                player.vehicle.customPrimaryColor = new RGBA(r, g, b, 255);
                return;
            }, 750);
            send(player, `You turn on rainbow color mode!`);
        }
    }
    static setVehicleNeons(player, args) {
        const color = new RGBA(args[0], args[1], args[2], args[3]);
        send(player, `RGB Color: ${Math.floor(color.r)},${color.g},${color.b}`);
        player.vehicle.neon = {
            front: true,
            back: true,
            left: true,
            right: true
        };
        player.vehicle.neonColor = new RGBA(color.r, color.g, color.b, color.a);
    }
    static setVehicleFullTune(player) {
        const v = player.vehicle;
        v.modKit = 1;
        for(let i = 0; i < 68; i++)v.setMod(i, v.getModsCount(i));
        for(let i1 = 0; i1 < 20; i1++)v.setExtra(i1, true);
    }
    static disconnect(player) {
        if (player["Veh"]) {
            player['Veh'].destroy();
        }
        PointBlip.all.forEach((blip)=>{
            blip.destroy();
        });
        player.deleteStreamSyncedMeta('NICKNAME');
    }
}) || _class, _dec = registerCmd('v', _class._spawnVehicle), _dec1 = typeof Reflect !== "undefined" && typeof Reflect.metadata === "function" && Reflect.metadata("design:type", Function), _dec2 = typeof Reflect !== "undefined" && typeof Reflect.metadata === "function" && Reflect.metadata("design:paramtypes", [
    typeof Player === "undefined" ? Object : Player,
    Array
]), _applyDecoratedDescriptor(_class, "_spawnVehicle", [
    _dec,
    _dec1,
    _dec2
], Object.getOwnPropertyDescriptor(_class, "_spawnVehicle"), _class), _dec3 = registerCmd('wp', _class.giveWeapon), _dec4 = typeof Reflect !== "undefined" && typeof Reflect.metadata === "function" && Reflect.metadata("design:type", Function), _dec5 = typeof Reflect !== "undefined" && typeof Reflect.metadata === "function" && Reflect.metadata("design:paramtypes", [
    typeof Player === "undefined" ? Object : Player,
    Array
]), _applyDecoratedDescriptor(_class, "giveWeapon", [
    _dec3,
    _dec4,
    _dec5
], Object.getOwnPropertyDescriptor(_class, "giveWeapon"), _class), _dec6 = registerCmd('dvc', _class.deletePlayerVehicle), _dec7 = typeof Reflect !== "undefined" && typeof Reflect.metadata === "function" && Reflect.metadata("design:type", Function), _dec8 = typeof Reflect !== "undefined" && typeof Reflect.metadata === "function" && Reflect.metadata("design:paramtypes", [
    typeof Player === "undefined" ? Object : Player
]), _applyDecoratedDescriptor(_class, "deletePlayerVehicle", [
    _dec6,
    _dec7,
    _dec8
], Object.getOwnPropertyDescriptor(_class, "deletePlayerVehicle"), _class), _dec9 = registerCmd('skin', _class.setPlayerModel), _dec10 = typeof Reflect !== "undefined" && typeof Reflect.metadata === "function" && Reflect.metadata("design:type", Function), _dec11 = typeof Reflect !== "undefined" && typeof Reflect.metadata === "function" && Reflect.metadata("design:paramtypes", [
    typeof Player === "undefined" ? Object : Player,
    Array
]), _applyDecoratedDescriptor(_class, "setPlayerModel", [
    _dec9,
    _dec10,
    _dec11
], Object.getOwnPropertyDescriptor(_class, "setPlayerModel"), _class), _dec12 = registerCmd('vcol', _class.setVehicleColor), _dec13 = typeof Reflect !== "undefined" && typeof Reflect.metadata === "function" && Reflect.metadata("design:type", Function), _dec14 = typeof Reflect !== "undefined" && typeof Reflect.metadata === "function" && Reflect.metadata("design:paramtypes", [
    typeof Player === "undefined" ? Object : Player,
    Object
]), _applyDecoratedDescriptor(_class, "setVehicleColor", [
    _dec12,
    _dec13,
    _dec14
], Object.getOwnPropertyDescriptor(_class, "setVehicleColor"), _class), _dec15 = registerCmd('fix', _class.repairVehicle), _dec16 = typeof Reflect !== "undefined" && typeof Reflect.metadata === "function" && Reflect.metadata("design:type", Function), _dec17 = typeof Reflect !== "undefined" && typeof Reflect.metadata === "function" && Reflect.metadata("design:paramtypes", [
    typeof Player === "undefined" ? Object : Player,
    Object
]), _applyDecoratedDescriptor(_class, "repairVehicle", [
    _dec15,
    _dec16,
    _dec17
], Object.getOwnPropertyDescriptor(_class, "repairVehicle"), _class), _dec18 = registerCmd('rcol', _class.rainbowColor), _dec19 = typeof Reflect !== "undefined" && typeof Reflect.metadata === "function" && Reflect.metadata("design:type", Function), _dec20 = typeof Reflect !== "undefined" && typeof Reflect.metadata === "function" && Reflect.metadata("design:paramtypes", [
    typeof Player === "undefined" ? Object : Player
]), _applyDecoratedDescriptor(_class, "rainbowColor", [
    _dec18,
    _dec19,
    _dec20
], Object.getOwnPropertyDescriptor(_class, "rainbowColor"), _class), _dec21 = registerCmd('neonc', _class.setVehicleNeons), _dec22 = typeof Reflect !== "undefined" && typeof Reflect.metadata === "function" && Reflect.metadata("design:type", Function), _dec23 = typeof Reflect !== "undefined" && typeof Reflect.metadata === "function" && Reflect.metadata("design:paramtypes", [
    typeof Player === "undefined" ? Object : Player,
    Array
]), _applyDecoratedDescriptor(_class, "setVehicleNeons", [
    _dec21,
    _dec22,
    _dec23
], Object.getOwnPropertyDescriptor(_class, "setVehicleNeons"), _class), _dec24 = registerCmd('ftune', _class.setVehicleFullTune), _dec25 = typeof Reflect !== "undefined" && typeof Reflect.metadata === "function" && Reflect.metadata("design:type", Function), _dec26 = typeof Reflect !== "undefined" && typeof Reflect.metadata === "function" && Reflect.metadata("design:paramtypes", [
    typeof Player === "undefined" ? Object : Player
]), _applyDecoratedDescriptor(_class, "setVehicleFullTune", [
    _dec24,
    _dec25,
    _dec26
], Object.getOwnPropertyDescriptor(_class, "setVehicleFullTune"), _class), _dec27 = on('playerDisconnect', _class.disconnect), _dec28 = typeof Reflect !== "undefined" && typeof Reflect.metadata === "function" && Reflect.metadata("design:type", Function), _dec29 = typeof Reflect !== "undefined" && typeof Reflect.metadata === "function" && Reflect.metadata("design:paramtypes", [
    typeof Player === "undefined" ? Object : Player
]), _applyDecoratedDescriptor(_class, "disconnect", [
    _dec27,
    _dec28,
    _dec29
], Object.getOwnPropertyDescriptor(_class, "disconnect"), _class), _class);
CommandsHandler;
