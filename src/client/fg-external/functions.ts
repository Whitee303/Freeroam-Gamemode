import { Player, Vehicle } from "alt-client";
import { addTextComponentSubstringPlayerName, beginTextCommandDisplayText, beginTextCommandThefeedPost, clearDrawOrigin, drawMarker, endTextCommandDisplayText, endTextCommandThefeedPostMessagetextTu, endTextCommandThefeedPostTicker, setDrawOrigin, setTextCentre, setTextColour, setTextDropShadow, setTextFont, setTextJustification, setTextOutline, setTextScale, setTextWrap } from "natives";
import { ExternalFunctions } from "../../shared/fg-external/functions";
export class ExternalFunctionsClient extends ExternalFunctions {
	private static hexToRgb(hex: string) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	}
	static getClosestPlayer(player: Player) {
		return ExternalFunctionsClient.getClosestVectorFromGroup(player.pos, [...Player.all]);
	}
	static getClosestVehicle(player: Player) {
		return ExternalFunctionsClient.getClosestVectorFromGroup(player.pos, [...Vehicle.all]);
	}
	static drawText2d(msg: string, x: any, y: any, scale: any, fontType: any, r: any, g: any, b: any, a: any, useOutline = true, useDropShadow = true, layer = 0, align = 0) {
		let hex = msg.match('{.*}');
		if (hex) {
			const rgb = ExternalFunctionsClient.hexToRgb(hex[0].replace('{', '').replace('}', ''));
			r = rgb[0];
			g = rgb[1];
			b = rgb[2];
			msg = msg.replace(hex[0], '');
		}
		beginTextCommandDisplayText('STRING');
		addTextComponentSubstringPlayerName(msg);
		setTextFont(fontType);
		setTextScale(1, scale);
		setTextWrap(0.0, 1.0);
		setTextCentre(true);
		setTextColour(r, g, b, a);
		setTextJustification(align);
		if (useOutline) {
			setTextOutline();
		}

		if (useDropShadow) {
			setTextDropShadow();
		}

		endTextCommandDisplayText(x, y, 0);
	}
	static drawText3d(msg: string, x: number, y: number, z: number, scale: number, fontType: number, r: number, g: number, b: number, a: number, useOutline = true, useDropShadow = true, layer = 0) {
		let hex = msg.match('{.*}');
		if (hex) {
			const rgb = ExternalFunctionsClient.hexToRgb(hex[0].replace('{', '').replace('}', ''));
			r = rgb[0];
			g = rgb[1];
			b = rgb[2];
			msg = msg.replace(hex[0], '');
		}

		setDrawOrigin(x, y, z, 0);
		beginTextCommandDisplayText('STRING');
		addTextComponentSubstringPlayerName(msg);
		setTextFont(fontType);
		setTextScale(1, scale);
		setTextWrap(0.0, 1.0);
		setTextCentre(true);
		setTextColour(r, g, b, a);

		if (useOutline) {
			setTextOutline();
		}

		if (useDropShadow) {
			setTextDropShadow();
		}

		endTextCommandDisplayText(0, 0, 0);
		clearDrawOrigin();
	}
	static drawNotification(imageName: string, headerMsg: any, detailsMsg: any, message: string) {
		beginTextCommandThefeedPost('STRING');
		addTextComponentSubstringPlayerName(message);
		endTextCommandThefeedPostMessagetextTu(
			imageName.toUpperCase(),
			imageName.toUpperCase(),
			false,
			4,
			headerMsg,
			detailsMsg,
			1.0,
		);
		endTextCommandThefeedPostTicker(false, false);
	}
	static createMarker(type: number, pos: { x: number; y: number; z: number; }, dir: { x: number; y: number; z: number; }, rot: { x: number; y: number; z: number; }, scale: { x: number; y: number; z: number; }, r: number, g: number, b: number, alpha: number) {
		if (!type) {
			new Error("Invalid type!");
			return;
		}
		drawMarker(type, pos.x, pos.y, pos.z, dir.x, dir.y, dir.z, rot.x, rot.y, rot.z, scale.x, scale.y, scale.z, r, g, b, alpha, false, true, 2, false, undefined, undefined, false);
	}
}