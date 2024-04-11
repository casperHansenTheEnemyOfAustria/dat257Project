import React from 'react';

export default function Resultbox({counties}) {
        {
        return (
            
            <div class="resultbox"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors">
                <h1> Result </h1>
                <p id="result-text"> This is the result of the search </p>
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



    var element = document.getElementById("result-text"); 
    element.innerText = info

}



