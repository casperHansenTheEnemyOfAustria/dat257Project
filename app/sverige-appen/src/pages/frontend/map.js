'use client'
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import React from "react";
import counties from "./public/geography/counties.json";
import { useMapEvents } from 'react-leaflet/hooks'

class Map extends React.Component {
    onEachFeature(feature, layer) {
        //bind click
        layer.on({
            click: function (e) {
                console.log(feature.properties.name);
            }
        });


        layer.bindPopup(feature.properties.name);


    }
    
  render() {
  return (
    <div >
       <MapContainer center={[62.0, 15.0]} zoom={5} scrollWheelZoom={false} style={{ height: "50vh", width: "100vw" }} pmIgnore={false} >
            <GeoJSON data={counties} onEachFeature={this.onEachFeature} />
          </MapContainer>
    </div>
  );
  }
}





export default Map;
