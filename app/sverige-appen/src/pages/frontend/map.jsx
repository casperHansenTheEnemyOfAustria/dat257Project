import React from 'react';
import { MapContainer, GeoJSON, useMap } from "react-leaflet";
import counties from "./public/geography/counties.json";
import '../globals.css';
import "leaflet/dist/leaflet.css";

import colorGradient from 'javascript-color-gradient';


class Map extends React.Component {
    constructor(props) {
        var ref = React.createRef();
        super(props);
        this.state = {
            mapKey: Math.random(),

        };
    
    }

    forceUpdateMap = () => {
        //alert('force update');
        this.setState({ mapKey: Math.random() });
    }

    onEachFeature(feature, layer) {
        //bind click

        layer.on({
            contextmenu: function (e) {


                this.forceUpdateMap();

            }.bind(this)
        });
        layer.bindPopup(feature.properties.name);
    }

    getStyle(feature) {

        const gradient = new colorGradient();
        gradient.setColorGradient('#FF0000', '#09cdda');
        var result_ln = document.getElementsByClassName("countyDropdown")[0].value;
        var result_emission = document.getElementsByClassName("emissionDropdown")[0].value;
        var result_year = document.getElementsByClassName("yearDropdown")[0].value;
        var new_result_ln = result_ln.replace('s län', '');
        var new_result_ln = new_result_ln.replace(' län', '');
        var new_result_ln = new_result_ln.replace('Örebro', 'Orebro');
        this.map = useMap();

        if (new_result_ln == 'Alla') {

            // make the colors correspond to the countys emissions
            var color = '#09cdda';
            var counties = this.props.repo.counties;

            var current_emission_index = this.props.repo.emissionTypes.indexOf(result_emission);

            var emissionForAllCounties = counties[0].emissions[result_year][current_emission_index];
            for (var i = 0; i < counties.length; i++) {
                new_result_ln = counties[i].name;
                new_result_ln = new_result_ln.replace('s län', '');
                new_result_ln = new_result_ln.replace(' län', '');
                new_result_ln = new_result_ln.replace('Örebro', 'Orebro');
                console.log(new_result_ln);
                if (new_result_ln == feature.properties.name) {

                    var emissionNum = counties[i].emissions[result_year][current_emission_index];
                    var emissionPercentage = emissionNum * 100 / emissionForAllCounties;
        

                    color = gradient.getColor(emissionPercentage);
                    return { color: color };


                }
            }


        } else {

            if (feature.properties.name === new_result_ln) {
                this.fit(feature.geometry.coordinates);
                return { color: '#ff0000' }; // Change this to the color you want

            } else {
                return { color: '#09cdda' }; // Default color
            }
        }


    }

    fit(coordinates) {
        //TODO make this nicer
        console.log(coordinates[0].length);
        var bounds
        if (coordinates[0].length === 1){
            bounds = coordinates[0][0].map((coord) => [coord[1], coord[0]]);

        }
        else if (coordinates[0][0].length === 2) {
            bounds = coordinates[0].map((coord) => [coord[1], coord[0]]);
        } else if (coordinates[0][0][0].length === 2) {
            bounds = coordinates[0].map((coord) => [coord[1], coord[0]]);
        }else {
            bounds = coordinates[0][0].map((coord) => [coord[1], coord[0]]);
        }
       



        console.log(bounds);
        this.map = useMap();
        try{
            this.map.fitBounds(bounds);
        }catch(e){
            this.map.fitBounds([coordinates[0], coordinates[1]]);
            console.log(e);
        }
        // this.map.zoomControl._map.setView(bounds[0], 6);
        
        
    }

    // a fucntion that zooms in to some coordinates 
   
    render() {
        return (
           
            <MapContainer key={this.state.mapKey}  center={[62.0, 15.0]} scrollWheelZoom={false} zoom={5} attributionControl={false} className={'map'} id={'mapid'} mapRef={this.ref}>
                <GeoJSON data={counties.features} onEachFeature={this.onEachFeature.bind(this)} style={this.getStyle.bind(this)} />
            </MapContainer>
            
            
        );
    }
}

export default Map;