import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import React from "react";
import counties from "./public/geography/counties.json";
import { useMapEvents } from 'react-leaflet/hooks'

const Map = () => {
  
  return (
    <div >
       <MapContainer center={[62.0, 15.0]} zoom={5} scrollWheelZoom={false} style={{ height: "50vh", width: "100vw" }} pmIgnore={false} >

            <GeoJSON data={counties.features} onEachFeature={onEachFeature.bind(this)}/> 
         
          </MapContainer>
    </div>
  );
}

function onEachFeature(feature, layer) {
    //bind click

    layer.bindPopup(feature.properties.name);
}




export default Map;