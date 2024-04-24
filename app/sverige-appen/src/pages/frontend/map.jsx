'use client'
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import React from "react";
import counties from "./public/geography/counties.json";
import { useMapEvents } from 'react-leaflet/hooks'

class Map extends React.Component {
    onEachFeature(feature, layer) {
        //bind click
        console.log(feature.properties.name);
        layer.on({
            click: function (e) {
                console.log(feature.properties.name);
            }
        });
        layer.bindPopup(feature.properties.name);
    }
    
  render() {
  return (

       <MapContainer center={[62.0, 15.0]} zoom={5}  style={{ height: "50vh", width: "100vw" }}  >
            <GeoJSON data={counties.features} onEachFeature={this.onEachFeature} />
          </MapContainer>

  );
  }
}





export default Map;
