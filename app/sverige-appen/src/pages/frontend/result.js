import React from 'react';
import '../globals.css';

export default function Resultbox({counties}) {
        {
        return (
            <div className="resultBox">
                <h1>Result:</h1>
                <p id="result-text">
                    This is the result of the search
                </p>
            </div>
        );
    };
    };


export function updateResult(repo, ln, year, emission) {
    var info= ""
    repo.counties.forEach((county) => {
        console.log(year)
        
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
    element.innerText = info +" tons"

}



