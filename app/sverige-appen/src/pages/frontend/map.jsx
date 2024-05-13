import React from 'react';

import { MapContainer, GeoJSON, useMap } from "react-leaflet";
import counties from "./public/geography/counties.json";
import municipalities from "./public/geography/municipalities.json";
import '../globals.css';
import "leaflet/dist/leaflet.css";
import Legend from './Legend.js';



import colorGradient from 'javascript-color-gradient';
const gradient = new colorGradient();
const preferredMode = window.matchMedia('(prefers-color-scheme: light)');
if (preferredMode.matches) {
    gradient.setColorGradient('#A0DA39', '#4AC16D', '#1FA187', '#277F8E', '#365C8D', '#46327E', '#440154');
} else {
    gradient.setColorGradient('#828708', '#52A302', '#24A50A', '#32B861', '#5CDBCF', '#49B5F4', '#2A6BFE', '#2A21F9');
}
    
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

        
        var result_ln = document.getElementsByClassName("countyDropdown")[0].value;
        var result_emission = document.getElementsByClassName("emissionDropdown")[0].value;
        var result_year = document.getElementsByClassName("yearDropdown")[0].value;
        var new_result_ln = result_ln.replace('s län', '');
        var new_result_ln = new_result_ln.replace(' län', '');
        var new_result_ln = new_result_ln.replace('Örebro', 'Orebro');
        this.map = useMap();

        if (new_result_ln == 'Alla') {
            console.log(document.getElementsByClassName("muniDropdown")[0].value)

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

                if (new_result_ln == feature.properties.name) {

                    var emissionNum = counties[i].emissions[result_year][current_emission_index];
                    var emissionPercentage = emissionNum * 200 / emissionForAllCounties;
        

                    color = gradient.getColor(emissionPercentage);
                    return { color: color, backgound: color, opacity: 100, stroke: 1, fillOpacity: 100, fill: color};


                }
            }


        } else {

            if (feature.properties.name === new_result_ln) {
                this.fit(feature.geometry.coordinates);
                return { color: '#000000' }; // Change this to the color you want

            } else {
                return {opacity: 0, color: '#000000'}; // Default color
            }
        }


    }

    fit(coordinates) {
        //TODO make this nicer

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
       



        
        this.map = useMap();
        try{
            this.map.fitBounds(bounds);
        }catch(e){
            this.map.fitBounds([coordinates[0], coordinates[1]]);

        }
        // this.map.zoomControl._map.setView(bounds[0], 6);
        
        
    }

    // a fucntion that zooms in to some coordinates 
   
    onEachFeatureMuni(feature, layer) {
        //bind click
        layer.on({
            contextmenu: function (e) {
                this.forceUpdateMap();
            }.bind(this)
        });
        
    }

    getStyleMuni(feature) {
        var result_mn = this.props.repo.currentSearch.municipality;
        var result_emission = document.getElementsByClassName("emissionDropdown")[0].value;
        var result_year = document.getElementsByClassName("yearDropdown")[0].value;
        var style
        var color
        if (result_mn == 'Alla') {
                      // make the colors correspond to the countys emissions
   
            var currentSearchCounty = this.props.repo.currentSearch.county;
            if (currentSearchCounty == 'Alla') {
     
                return {display: 'none', opacity: 0};
            }
            var munies = this.props.repo.municipalities[currentSearchCounty];


            var current_emission_index = this.props.repo.emissionTypes.indexOf(result_emission);

            var emissionForAllCounties =  munies[0].emissions[result_year][current_emission_index];

            for (var i = 0; i < munies.length; i++) {
                var new_result_ln = munies[i].name;
     

                if (new_result_ln == feature.properties.name) {

                    var emissionNum = munies[i].emissions[result_year][current_emission_index];
                    var emissionPercentage = emissionNum / emissionForAllCounties;
             

                    color = gradient.getColor(emissionPercentage);
        
                    return { color: color, backgound: color, opacity: 100, strokeWidth: 1, fillOpacity: 100, fill: color};

                }else{
                    style = {opacity: 0, fillOpacity: 0};
                }
            }
            return style;
          
        } else {
            if (feature.properties.name === result_mn) {
                return { color: '#cb99e6', stroke: false, fillOpacity: 100 }; // Change this to the color you want
            } else {
                return { opacity: 0, fillOpacity: 0 }; // Default color
            }
        }

        
    }
    render() {
        return (
           
            <MapContainer key={this.state.mapKey}  center={[62.0, 15.0]} scrollWheelZoom={false} zoom={5} attributionControl={false} className={'map'} id={'mapid'} mapRef={this.ref}>
                <GeoJSON data={counties.features} onEachFeature={this.onEachFeature.bind(this)} style={this.getStyle.bind(this) } />
                <Legend gradient={{gradient: gradient}} />
                <GeoJSON data={municipalities.features} onEachFeature={this.onEachFeatureMuni.bind(this)} style={this.getStyleMuni.bind(this)} />
            </MapContainer>
            
            
        );
    }
}




export default Map;