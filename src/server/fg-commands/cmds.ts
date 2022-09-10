import { hash, log, Player, Vehicle, setInterval, RGBA, on, Blip, PointBlip } from "alt-server";
import { registerCmd, send } from "../chat-master/startup";
import { PedTable } from "../../shared/lists/Peds";
import { WeaponModel } from "../../shared/lists/Weapons";
import { ExternalFunctions } from '../../shared/fg-external/functions';

class CommandsHandler {
	@registerCmd('v', CommandsHandler._spawnVehicle)
	private static _spawnVehicle(player: Player, args: string[]): any {
		if (args.length <= 0) {
			send(player, '/v [VehicleName]');
			return;
		}
		const vehiclehash = hash(args[0]);
		const { x, y, z } = player.pos;
		if (!vehiclehash) {
			send(player, 'The specified vehicle does not exist!');
			return;
		}
		new Promise((resolve, reject) => {
			player['Car'] = new Vehicle(vehiclehash, x, y + 1, z, 0, 0, 0);
			resolve(player['Car']);
		}).then((vehicle) => {
			if (vehicle instanceof Vehicle) {
				player.setIntoVehicle(vehicle, 1);
			}
		});
	}
	@registerCmd('wp', CommandsHandler.giveWeapon)
	private static giveWeapon(player: Player, args: string[]) {
		const WeaponName = args[0];
		if (!args.length) {
			send(player, `/wp [Weapon_name]`);
			return;
		};

		if (!WeaponModel[WeaponName]) {
			send(player, `Weapon is undefined (/wp [Weapon_name])`);
		}
		else {
			player.giveWeapon(WeaponModel[WeaponName], 500, true);
		};
	}
	@registerCmd('dvc', CommandsHandler.deletePlayerVehicle)
	private static deletePlayerVehicle(player: Player) {
		if (player.vehicle) {
			player.vehicle.destroy();
		}
	}
	@registerCmd('skin', CommandsHandler.setPlayerModel)
	private static setPlayerModel(player: Player, args: string[]) {
		const skinName = args[0];
		if (!args.length) {
			send(player, `/skin [skin_name]`);
			return;
		};

		if (!PedTable[skinName]) {
			send(player, `Skin is undefined (/skin [Skin_Name])`);
		}
		else {
			send(player, "Skin name is good!");
			player.model = PedTable[skinName];
		};
	}
	@registerCmd('vcol', CommandsHandler.setVehicleColor)
	private static setVehicleColor(player: Player, veh: any) {
		if (player.vehicle) {
			player.vehicle.primaryColor = veh[0] as unknown as number;
			player.data.primaryColorChange = veh.primaryColor;
			if (veh > 255) {
				return;
			}

			send(player, `You change the vehicle color:{b9de16} ${player.vehicle.primaryColor}`);
		}
	}
	@registerCmd('fix', CommandsHandler.repairVehicle)
	private static repairVehicle(player: Player, vehicle: any) {
		if (player.vehicle) {
			player.vehicle.repair();
		}
	}
	@registerCmd('rcol', CommandsHandler.rainbowColor)
	private static rainbowColor(player: Player) {
		if (player.vehicle) {
			if (player.data.colorChange) {
				send(player, `You turn off rainbow color mode.`);
				clearInterval(player.data.colorChange);
				player.data.colorChange = null;
				return;
			}

			player.data.colorChange = setInterval(() => {
				const r = ExternalFunctions.randomColor();
				const g = ExternalFunctions.randomColor();
				const b = ExternalFunctions.randomColor();
				player.vehicle.customPrimaryColor = new RGBA(r, g, b, 255);
				return;
			}, 750);
			send(player, `You turn on rainbow color mode!`);
		}
	}
	@registerCmd('neonc', CommandsHandler.setVehicleNeons)
	private static setVehicleNeons(player: Player, args: number[]) {
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
	@registerCmd('ftune', CommandsHandler.setVehicleFullTune)
	private static setVehicleFullTune(player: Player) {
		const v = player.vehicle;
		v.modKit = 1;
		for (let i = 0;i < 68;i++) v.setMod(i, v.getModsCount(i));
		for (let i = 0;i < 20;i++) v.setExtra(i, true);
	}
	@on('playerDisconnect', CommandsHandler.disconnect)
	private static disconnect(player: Player) {
		if (player["Veh"]) {
			player['Veh'].destroy();
		}
		PointBlip.all.forEach((blip) => { blip.destroy(); });
		player.deleteStreamSyncedMeta('NICKNAME');
	}

};
CommandsHandler;