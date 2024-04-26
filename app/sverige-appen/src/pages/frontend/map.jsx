import React from 'react';
import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";
import counties from "./public/geography/counties.json";
import '../globals.css';
import "leaflet/dist/leaflet.css";

import colorGradient from 'javascript-color-gradient';


class Map extends React.Component {
    constructor(props) {

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
    
        var result_ln = this.props.repo.currentSearch.county;
        var result_emission = this.props.repo.currentSearch.emissionType;
        var result_year = this.props.repo.currentSearch.year;
        var new_result_ln = result_ln.replace('s län', '');
        var new_result_ln = new_result_ln.replace(' län', '');
        var new_result_ln = new_result_ln.replace('Örebro', 'Orebro');

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
      
                if (new_result_ln == feature.properties.name) {

                    var emissionNum = counties[i].emissions[result_year][current_emission_index];
                    var emissionPercentage = emissionNum * 100 / emissionForAllCounties;
        

                    color = gradient.getColor(emissionPercentage);
                    return { color: color };


                }
            }


        } else {

            if (feature.properties.name === new_result_ln) {
                return { color: '#ff0000' }; // Change this to the color you want
            } else {
                return { color: '#09cdda' }; // Default color
            }
        }


    }

    render() {
        return (
            <MapContainer key={this.state.mapKey} center={[62.0, 15.0]} scrollWheelZoom={false} zoom={5} attributionControl={false} className={'map'}>
                <GeoJSON data={counties.features} onEachFeature={this.onEachFeature.bind(this)} style={this.getStyle.bind(this)} />
            </MapContainer>
        );
    }
}

export default Map;