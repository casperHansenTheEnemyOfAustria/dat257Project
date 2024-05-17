import React from 'react';
import '../globals.css';
import { Grid } from '@material-ui/core';

export default function Resultbox({counties}) {
        {
        return (
            <Grid item xs={12} className="resultBox">
                <Grid item xs={12}>
                    <h1 id="location">Plats</h1>
                </Grid>
                <Grid item xs={12}>
                    <p id="location-text"> Här visas allmän info om platsen du valt att du vill se!</p>
                </Grid>
                <Grid item xs={12}>
                    <h2>Utsläpp</h2>
                </Grid>
                <Grid item xs={12}>
                    <p id="result-text">Här visas utsläppen du valt att du vill se, klicka på sök och testa!</p>
                </Grid>
            </Grid>
        );
    };
    };


export function updateResult(repo, ln, year, emission, municipality) {
    var info= ""
    console.log("repo: " + repo.emissionTypes)
    console.log(emission)
    var emission = repo.emissionTypes.indexOf(emission)
    console.log("emission: " + emission)
    let population_text
    let majorities_text
    repo.counties.forEach((county) => {
       
        
      if (county.name == ln && municipality == "Alla") {
        // console.log(county.emissions[year])
        info = county.emissions[year][emission]
        var element = document.getElementById("location");
        element.innerText =ln

        let selected_county_info = repo.counties.find(county => county.name === ln).info

        let selected_county_majority = selected_county_info.majorities
        let majority = (selected_county_majority[year] == undefined) ? "NaN" : selected_county_majority[year]
        majorities_text = "Styrande partier år " + year + ": " + majority + ",\n"
        console.log(selected_county_info)
        let selected_county_population = selected_county_info.populations
        let population = (selected_county_population[year] == undefined) ? "NaN" : selected_county_population[year]
        population_text = "Befolkning år " + year + ": " + population + " personer.\n"
      }else if(county.name == ln && municipality != "Alla"){
        repo.municipalities[ln].forEach((mInC) => {
            if(mInC.name == municipality){
                info = mInC.emissions[year][emission]
                var element = document.getElementById("location");
                element.innerText =municipality

                let selected_municipality_info = mInC.info
                
                let selected_municipality_majority = selected_municipality_info.majorities
                let majority = (selected_municipality_majority[year] == undefined) ? "NaN" : selected_municipality_majority[year]
                majorities_text = "Styrande partier år " + year + ": " + majority+ ",\n"
                population_text = "Not available for municipalities"
            }
        })
      }
      
    }); 



    



    var infoValue = parseFloat(info);

    infoValue = infoValue.toFixed(2);

    info = infoValue.toString();

    var element = document.getElementById("result-text"); 
    element.innerText = info +" ton"



    var element = document.getElementById("location-text");
    element.innerText =  majorities_text + population_text

}



