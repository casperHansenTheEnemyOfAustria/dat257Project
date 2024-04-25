'use client'
import { MapContainer, TileLayer, GeoJSON, AttributionControl, Rectangle } from "react-leaflet";
import React from "react";
import counties from "./public/geography/counties.json";
import { useMapEvents } from 'react-leaflet/hooks'
import '../globals.css';
import "leaflet/dist/leaflet.css";

import {useEffect, useState} from 'react';
import { Geo } from "next/font/google";
import { on } from "events";


function onEachFeature(feature, layer) {
    //bind click
    console.log("hi")
    layer.on({
        click: function (e) {
            
        

    });
    layer.bindPopup(feature.properties.name);
}



function Map({repo}){

    useState(() => {
        const fetchData = async () => {
            const data = await repo
            console.log(data);
        }
        fetchData();
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {

        }, 5000);
        return () => clearInterval(interval);
    }, [repo]);


  
  return (
            <MapContainer center={[62.0, 15.0]} scrollWheelZoom={false} zoom={5}   attributionControl={false} className={'map'}>
                <GeoJSON data={counties} onEachFeature={onEachFeature} />
            </MapContainer>  
  );
  
}

export default Map;
