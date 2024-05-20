'use client'

import React from 'react';
import '../pages/globals.css';
import { Grid } from '@mui/material';

export default function Resultbox({counties}) {
        {
        return (
            <Grid container spacing={0} item xs={12} className="resultBox">
                <Grid item xs={12}>
                    <h1 id="location">Plats</h1>
                </Grid>
                <Grid item xs={12}>
                    <p id="location-text"> Här visas allmän info om platsen du valt att du vill se!</p>
                </Grid>
                <Grid item xs={12}>
                    <h1>Utsläpp</h1>
                </Grid>
                <Grid item xs={12}>
                    <p id="result-text">Här visas utsläppen du valt att du vill se, klicka på sök och testa!</p>
                </Grid>
            </Grid>
        );
    };
    };

/**
 * 
 * @param {the information repositiory} repo 
 * @param {a county name} ln 
 * @param {a number as a year} year 
 * @param {an index of the sleected emissions type} emission 
 * @param {a municipality name} municipality 
 */
export function updateResult(repo, ln, year, emission, municipality) {
    var info= ""
    var emission = repo.emissionTypes.indexOf(emission)
    let population_text
    let majorities_text
    repo.counties.forEach((county) => {
      if (county.name == ln && municipality == "Alla") {
        // console.log(county.emissions[year])
        // Get emissions for the selected year
        info = county.emissions[year][emission]
        // Get the location name
        var element = document.getElementById("location");
        element.innerText =ln

        // fetching the majority data
        let selected_county_info = repo.counties.find(county => county.name === ln).info
        let selected_county_majority = selected_county_info.majorities
        let majority = (selected_county_majority[year] == undefined) ? "NaN" : selected_county_majority[year]
        majorities_text = "Styrande partier år " + year + ": " + majority + ",\n"

        // fetching the population data
        let selected_county_population = selected_county_info.populations
        let population = (selected_county_population[year] == undefined) ? "NaN" : selected_county_population[year]
        population_text = "Befolkning år " + year + ": " + population + " personer.\n"
      }else if(county.name == ln && municipality != "Alla"){
        // Checking though the municipalities in the county
        repo.municipalities[ln].forEach((mInC) => {

            if(mInC.name == municipality){
                info = mInC.emissions[year][emission]
                // Get the location name
                var element = document.getElementById("location");
                element.innerText =municipality

                // fetching the majority data
                let selected_municipality_info = mInC.info
                let selected_municipality_majority = selected_municipality_info.majorities
                let majority = (selected_municipality_majority[year] == undefined) ? "NaN" : selected_municipality_majority[year]
                majorities_text = "Styrande partier år " + year + ": " + majority+ ",\n"

                // TODO get this in the db first
                population_text = "Not available for municipalities"
            }
        })
      }
      
    }); 



    

// -- This is the code that was in the original updateResult function
    // Round the number to 2 decimal places
    var infoValue = parseFloat(info);
    infoValue = infoValue.toFixed(2);
    info = infoValue.toString();
    // Set the text in the result box
    var element = document.getElementById("result-text"); 
    element.innerText = info +" ton"
    // Set the text in the location box
    var element = document.getElementById("location-text");
    element.innerText =  majorities_text + population_text

}



