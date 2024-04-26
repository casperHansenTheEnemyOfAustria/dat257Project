import React from 'react';
import { MapContainer, GeoJSON } from "react-leaflet";
import counties from "./public/geography/counties.json";
import '../globals.css';
import "leaflet/dist/leaflet.css";

class Map extends React.Component {
    constructor(props) {
        console.log(props);
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
        console.log(feature.properties.name);
        layer.on({
            contextmenu: function (e) {
                console.log(this.props);
                console.log(feature.properties.name);
               

                this.forceUpdateMap();
                
            }.bind(this)
        });
        layer.bindPopup(feature.properties.name);
    }

    getStyle(feature) {
        var result_ln = document.getElementsByClassName("countyDropdown")[0].value;
        var result_emission = document.getElementsByClassName("emissionDropdown")[0].value;
        var new_result_ln = result_ln.replace('s län', '');
        var new_result_ln = new_result_ln.replace(' län', '');
        ´
        if (new_result_ln === 'Alla') {
            // make the colors correspond to the countys emissions
            var color = '#09cdda';
            var counties = this.props.counties;
            
            for (var i = 0; i < counties.length; i++) {
                if (counties[i].name === feature.properties.name) {
                    
                }
            }


        }else{

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
                <GeoJSON data={counties.features} onEachFeature={this.onEachFeature.bind(this)} style={this.getStyle.bind(this)}  />
            </MapContainer>
        );
    }
}

export default Map;