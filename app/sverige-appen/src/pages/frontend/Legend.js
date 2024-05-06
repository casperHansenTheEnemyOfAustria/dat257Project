'use client'
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function Legend({ gradient }) {
  gradient = gradient.gradient 
    return (
          <div className="legend">
              
              <div className="legend-gradient" style={{background: `linear-gradient(to right, ${gradient})`}}>

                <div className="legend-text">
                  
                  <p>High</p>
                  <p>Low</p>
                </div>
              </div>
              
          </div>

    );
    
    
  }

export default Legend;