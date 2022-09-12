import { onServer, setMinimapIsRectangle } from "alt-client";
import { setMinimapBlockWaypoint, setMinimapHideFow, setRadarZoomPrecise, toggleStealthRadar } from "natives";
onServer('fixminimap', ()=>{
    setRadarZoomPrecise(93.5);
    setMinimapBlockWaypoint(true);
    setMinimapIsRectangle(true);
    toggleStealthRadar(true);
    setMinimapHideFow(true);
});
