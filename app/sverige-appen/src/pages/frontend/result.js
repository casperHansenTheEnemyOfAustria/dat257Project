import React from 'react';

export default function Resultbox({counties}) {
        {
        return (
            <div className="resultbox group rounded-lg border border-transparent px-5 py-4 transition-colors">
                <h1 style={{ fontSize: "40px", fontWeight: "bold", color: "white" }}>Result:</h1>
                <p id="result-text" style={{fontSize: "25px"}}>
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



