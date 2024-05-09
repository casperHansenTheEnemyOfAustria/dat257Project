'use client'
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function Legend({ gradient }) {
  gradient = gradient.gradient.getColors() 
  console.log(gradient)
  var gstart = gradient[0]
  var gend = gradient[-1]
  console.log(gstart)
    return (
          <div className="legend">
              
              <div className="legend-gradient" style={{background: `linear-gradient(to right, ${gstart}, ${gend}`}}>

                <div className="legend-text">
                  
                  <p className="top">100%</p>
                  <p className="bottom">0%</p>
                </div>
              </div>
              
          </div>

    );
    
    
  }

export default Legend;