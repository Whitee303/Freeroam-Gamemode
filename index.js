import { PedTable } from './ped_list';
import { WeaponModel } from './Weapon_list';
import alt from 'alt-server';
import * as chat from 'chat'
/// <reference types="@altv/types-shared" />

//Code Author is Whitee || Discord Contact: Whitee#0296//
  /////////////////////////////////////////////////////
/////                                              /////
    //////////////////////////////////////////////





    alt.Player.prototype.init = function init() {
        this.data = {};
    };
    
        alt.on('playerConnect', (player) => {
            player.init();
        });


function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
} // This Function From Stuyk Freeroam
  
function getRandomListEntry(list) {
    return randomNumber(0, list.length - 1);
} // This Function From Stuyk Freeroam

function randomColor() {
    return Math.floor(Math.random() * 255);
}



const PositionSpawnTable = [
    {x:-1368.6329345703125,y:57.125274658203125,z:53.6951904296875},
    {x:-666.949462890625,y:-135.25714111328125,z:37.906982421875},
    {x:-676.7340698242188,y:312.79119873046875,z:83.081298828125},
    {x:52.760440826416016,y:2786.1494140625,z:57.8740234375}

]; //This Table contains player spawn position. If you want add more position then: {x: yourpositionx, y:yourpositiony, z:yourpositionz}
const spawn = PositionSpawnTable[getRandomListEntry(PositionSpawnTable)]; ////




alt.on('playerConnect', (player) => {

    let playerCount = alt.Player.all.length;
    player.setMeta("Player:Joined","Anything");

    if (playerCount == undefined) {
        return;
    }
    alt.setTimeout(()=> {
        player.pos = {x:spawn.x,y:spawn.y,z:spawn.z};
        chat.broadcast(`{ebba34}${player.name} has been connect to the server.. Actual players count is:{078ff0} ${playerCount}`);
        player.model = 'mp_m_freemode_01';

    },1000)
    player.setDateTime(24, 1, 1994, 11, 0, 0); // 7 AM on January 24, 1994
    player.setWeather(1);

});





chat.registerCmd("v",async(player,args)=> {
        const hash = alt.hash(args[0]);
        if (args.length != 1) {
            chat.send(player,`{b00e0e}example: /v neon`);
            return;
        }
        try {
            player["Veh"] = new alt.Vehicle(hash,player.pos.x+1,player.pos.y,player.pos.z,0,0,0);
            player["Veh"].setMeta("Vehicle:AfterSpawned","Vehicle");

            alt.setTimeout(()=>{
                player.setIntoVehicle(player["Veh"], 1);
            },580);


 
        }
        catch(err) {
            chat.send(player, `{6b4900} Vehicle model: ${args[0]} {a19191}does not exist.`);
            return;
        }
        if (player["Veh"] !== undefined) {
            chat.send(player,"Tak");
        };

});  //This command called create vehicle.

chat.registerCmd("dvc",(player)=> {
    if (alt.Player && player.vehicle && player.Veh !== undefined) {
        if (player.vehicle.colorChange) alt.clearInterval(player.vehicle.colorChange);
            player.Veh.destroy();
            chat.send(player,`{00d142}You has been succesfully delete vehicle!`);
            player.data.emit = null;
    };
});


alt.on('playerDeath', (player, killer, weapon) => {
    chat.send(player,"You're unconscious... {eb004e}You will respawn in 3 seconds")
    alt.setTimeout(()=> {
        player.health = 199;
        player.pos = {x:spawn.x,y:spawn.y,z:spawn.z};
        return;
    },3000)
});


chat.registerCmd("skin",(player,args)=> {
    const skinName = args[0];
    if (!args.length) {
        chat.send(player,`{b00e0e}example: /skin [skin_name]`);
        return;
    };

    if (!PedTable[skinName]) {
        chat.send(player,`{cc6708}Skin is undefined... (/skin [Skin_Name])`);
    }
    else {
        chat.send(player,"Skin name is good!");
        player.model = PedTable[skinName];
    };
});

chat.registerCmd("vcol",(player,vehicle)=>{
    if (player.vehicle) {
        player.vehicle.primaryColor = vehicle;
        player.data.primaryColorChange = vehicle.primaryColor;
        if (vehicle > 255) {
            return;
        }

        chat.send(player,`{00d142}Yeea! You change the vehicle color:{b9de16} ${player.vehicle.primaryColor}`);
    }


});

chat.registerCmd("fix",(player,vehicle)=>{
    if (alt.Player && player.vehicle) {
        chat.send(player,`{00d142}Your vehicle has been repaired`);
        player.vehicle.repair();
    }
});

chat.registerCmd("rcol",(player,vehicle)=> {
    if (player.vehicle) {
        if (player.data.colorChange) {
        chat.send(player,`{cc6708}You turn off rainbow color mode.`)
        alt.clearInterval(player.data.colorChange);
        player.data.colorChange = null;
        return;
        }
        
            player.data.colorChange = alt.setInterval(()=> {
            const r = randomColor();
            const g = randomColor();
            const b = randomColor();
            player.vehicle.customPrimaryColor = { r, g, b, a: 255 };
            return;
        },750);
        chat.send(player,`{00d142}You turn on rainbow color mode!`);
    }

});

chat.registerCmd("wp",(player,args)=> {
    const WeaponName = args[0];
    if (!args.length) {
        chat.send(player,`{b00e0e}example: /wp [Weapon_name]`);
        return;
    };

    if (!WeaponModel[WeaponName]) {
        chat.send(player,`{cc6708}Weapon is undefined... (/wp [Weapon_name])`);
    }
    else {
        chat.send(player,"Weapon good");
        player.giveWeapon(WeaponModel[WeaponName],500,true);
    };
});

let timeout;
let emit;

alt.on('playerLeftVehicle', (player, targetVehicle, seat) => {
    if (player.data.emit) {
     alt.emitClient(player,"drawNotification","CHAR_SOCIAL_CLUB",'ExperienceV', 'Disclaimer', 'You must back to vehicle in 10 minutes!');
    }
    alt.clearInterval(player.data.colorChange);
    player.data.colorChange = null;
    timeout = alt.setTimeout(()=> {
        player.Veh.destroy();
    },600000);  
});


alt.on('playerEnteredVehicle', (player, targetVehicle, seat) => {
    if (targetVehicle.getMeta("Vehicle:AfterSpawned")) {
        targetVehicle.deleteMeta("Vehicle:AfterSpawned");
        player.data.emit = true;
        return;
    }
    else {
        alt.clearTimeout(timeout);
        alt.emitClient(player,"drawNotification","CHAR_SOCIAL_CLUB",'ExperienceV', 'Disclaimer'," Okay you don't have to be afraid of removing the vehicle!");
    }
   
});

chat.registerCmd("neonc",(player,args)=>{
    const color = new alt.RGBA(args[0],args[1],args[2],args[3])
    chat.send(player,`${color}`)
    chat.send(player,`RGB Color: ${Math.floor(color.r)},${color.g},${color.b}`)
    ///////////////////////////////////////////////////////////////////////////////
    player.vehicle.neon = {
        front: true,
        back: true,
        left: true,
        right: true
    };
    
    player.vehicle.neonColor = {
        r: color.r,
        g: color.g,
        b: color.b,
        a: color.a
    };


});
chat.registerCmd("tunec",(player,args)=>{
    for (let i = 0; i < args.length; i++)
    {
        if(isNaN(args[i])) {
            chat.send(player,`{de6049}Your value is string! Must be number. /tunec modIndex|modValue `);
            return;
        } else {
            player.vehicle.modKit = 1;
           player.vehicle.setMod(args[0], args[1]);
            console.log("as");
        }
        if (args.length >= 3) {
            chat.send(player,"Maximum arguments is 2!")
            return;
        }
    }
});


