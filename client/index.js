/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from 'alt-client';
import * as natives from 'natives';

const localPlayer = alt.Player.local;


alt.onServer('drawNotification', drawNotification);

export function drawNotification(imageName, headerMsg, detailsMsg, message) {
    natives.beginTextCommandThefeedPost('STRING');
    natives.addTextComponentSubstringPlayerName(message);
    natives.endTextCommandThefeedPostMessagetextTu(
        imageName.toUpperCase(),
        imageName.toUpperCase(),
        false,
        4,
        headerMsg,
        detailsMsg,
        1.0,
        ''
    );
    natives.endTextCommandThefeedPostTicker(false, false);
}

natives.addBlipForEntity(localPlayer)

