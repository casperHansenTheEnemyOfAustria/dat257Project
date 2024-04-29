import React from 'react';
import '../globals.css';

export default function Resultbox({counties}) {
        {
        return (
            <div className="resultBox">
                <h1 id="location">Plats</h1>
                <p id="location-text">
                    Info info info </p>
                <h2>Utsläpp</h2>
                <p id="result-text">
                    
                </p>
            </div>
        );
    };
    };


export function updateResult(repo, ln, year, emission) {
    var info= ""
    console.log("repo: " + repo.emissionTypes)
    console.log(emission)
    var emission = repo.emissionTypes.indexOf(emission)
    console.log("emission: " + emission)
    repo.counties.forEach((county) => {
       
        
      if (county.name == ln) {
        console.log(county.emissions[year])
         info = county.emissions[year][emission]
         console.log("ppeppeppeppe e")
      }
    });


    var infoValue = parseFloat(info);

    infoValue = infoValue.toFixed(2);

    info = infoValue.toString();

    var element = document.getElementById("result-text"); 
    element.innerText = info +" ton"

    var element = document.getElementById("location");
    element.innerText =ln

    var element = document.getElementById("location-text");
    element.innerText =  info 

}



