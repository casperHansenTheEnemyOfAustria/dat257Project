import React, { useState } from 'react';
import '../globals.css';
import Checkbox_Emission from './checkbox_emission';

export default function Resultbox({counties}) {
    const [isVisible, setIsVisible] = useState(false);

    const handleVisibility = () => {
        setIsVisible(isVisible);
    };

    return (
        <div className="resultBox">
            {isVisible && (
                <div>
                    <div id='Result_1'>
                        <h1 id="location">Plats</h1>
                        <p id="location-text">Info info info </p>
                        <h2>Emission Results</h2>
                        <p id="result-text">This is the result of the search</p>
                    </div>
                    <div id='Result_2'>
                        <h1 id="location">Plats</h1>
                        <p id="location-text">Info info info </p>
                        <h2>Emission Results</h2>
                        <p id="result-text_2">This is the result of the search</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export function updateResult(repo, ln, year, emission_NO2, emission_CO2) {
    var info= ""
    repo.counties.forEach((county) => {
        console.log(year)
        
      if (county.name == ln) {
        console.log(county.emissions[year])
         info = county.emissions[year][emission_NO2]
         console.log("ppeppeppeppe e")
      }
    });


    var infoValue = parseFloat(info);

    infoValue = infoValue.toFixed(2);
    document
    info = infoValue.toString();

    var temp = document.getElementById("Result_1");
    var element = temp.getElementById("result-text"); 
    element.innerText = info +" tons"

}



