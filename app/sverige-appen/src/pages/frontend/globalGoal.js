import React from 'react';
import dynamic from 'next/dynamic'
//importing globals
import '../globals.css';
import { Grid } from '@material-ui/core';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


//importing components

export const GlobalGoal = () => {
    return (
      <div className='popup-root'>
        <Popup trigger={<button className='popup-open-button'> About the program </button>} modal nested>
          {
            close => (
              <div className='popup-background'>
                <div className='popup-header'>
                  Information about global goal
                </div>
                <div className='popup-text'>
                  <p className='popup-text-1'>The project aims to highlight the emissions of the different regions in Sweden, to get a more insightful understanding of how the different counties and municipalities affect our country’s emissions. This correlates to number 11, Make cities and human settlements inclusive, safe, resilient and sustainable, and number 13, Take urgent action to combat climate change and its impacts, of UN sustainability goals.</p>

                  <p>The first aim of this project is aligned with reducing the environmental impact of cities in Sweden, this correlates specifically with 11.6 in UN sustainability goals. Moreover the goal states that we should provide more attention to the air quality. Since our product is designed to show users and inform them regarding air pollution connected to different parts of our country, this clearly aligns with the goal.</p>

                  <p>The second subtarget we are trying to fulfill with this project is 13.3, which states to increase knowledge and institutional capacity on climate change mitigation. Since our program shows different emissions in Sweden, we try to create awareness regarding the environment in each municipality. Later in the process, we want the program to be used as a basis in municipal political discussions to compare with other cities in Sweden. </p>

                </div>
                <div className="popup-image"> </div>
                <div className="popup-close-parent">
                  <button onClick={() => close()} id='popup-close-button'>
                    X
                  </button>
                </div>
              </div>
            )
          }
        </Popup>
      </div>
    );
  } 
