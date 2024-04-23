import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import React from "react";
import counties from "./public/geography/counties.json";

const Map = () => {
  return (
    <div>
       <MapContainer center={[62.0, 15.0]} zoom={5} scrollWheelZoom={false} style={{ height: "50vh", width: "100vw" }} pmIgnore={false} >

            <GeoJSON data={counties} /> 
          </MapContainer>
    </div>
  );
}
export default Map;