'use client'
import { MapContainer, TileLayer, GeoJSON, AttributionControl, Rectangle } from "react-leaflet";
import React from "react";
import counties from "./public/geography/counties.json";
import { useMapEvents } from 'react-leaflet/hooks'
import '../globals.css';


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

        <div className = "map">
            <MapContainer center={[62.0, 15.0]} scrollWheelZoom={false} zoom={5}  style={{ height: "90vh", width: "100vw" }} attributionControl={false}>
                <GeoJSON data={counties.features} onEachFeature={this.onEachFeature} />
            </MapContainer>
        </div>
  );
  }
}

export default Map;
