'use client'
import React from "react";
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';
import { useState } from 'react';

export default function Chart({repo}) {
  const [count, setCount] = useState(0);
  const update= () => {
      setCount(count + 1);
    };
  var years = repo.counties[0].years
  var currentSearch = repo.currentSearch
  var selectedCountyName = currentSearch.county
  var selectedEmission = currentSearch.emission
  var selectedMunicipalityName = currentSearch.municipality
  var emission = repo.emissionTypes.indexOf(selectedEmission)
  var emissions = []
  var selectedCounty = repo.counties.find(county => county.name === selectedCountyName)
  if(selectedMunicipalityName == "Alla") {
    for (var i = 0; i < years.length; i++) {
      var year = years[i]
      var emissionValue =selectedCounty.emissions[year][emission]
      emissions.push(emissionValue)
    }
  }else {
    console.log("municipality")
    var selectedMunicipality = repo.municipalities[selectedCountyName].find(municipality => municipality.name === selectedMunicipalityName)
    for (var i = 0; i < years.length; i++) {
      var year = years[i]
      var emissionValue =selectedMunicipality.emissions[year][emission]
      emissions.push(emissionValue)
    }
  }


  return (
    <Line
    className="chart"
    data = {{
      labels: years,
      datasets: [
        {
          label: 'Emissions',
          data: emissions,
        }, 
      ],
    }} onContextMenu={update} id="chart">
    </Line>
  );
}