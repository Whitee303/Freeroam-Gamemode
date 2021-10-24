/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />

import alt from 'alt-client'
import native from "natives";

const localPlayer = alt.Player.local.scriptID;


alt.onServer("event",Veh => {
    alt.setTimeout(() => {
        native.setPedIntoVehicle(localPlayer,Veh.scriptID,-1);
        native.setVehicleEngineOn(Veh.scriptID,false,true,true);
        alt.on('keydown', (key) => {
            if(key === 0x45) {
                alt.log("someone");
                native.setVehicleEngineOn(Veh.scriptID,true,true,true);
            }
        });
    },200)
});

