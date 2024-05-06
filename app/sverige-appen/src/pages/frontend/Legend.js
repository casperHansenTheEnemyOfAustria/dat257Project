'use client'
import { useEffect } from 'react';
import L from 'leaflet';
function Legend({ map }) {
    console.log(map);
    useEffect(() => {
      if (map) {
        const legend = L.control({ position: "bottomright" });
  
        legend.onAdd = () => {
          const div = L.DomUtil.create("div", "info legend");
          div.innerHTML =
            "<h4>This is the legend</h4>" +
            "<b>Lorem ipsum dolor sit amet consectetur adipiscing</b>";
          return div;
        };
  
        legend.addTo(map);
      }
    }, [map]); //here add map
    return null;
  }

export default Legend;