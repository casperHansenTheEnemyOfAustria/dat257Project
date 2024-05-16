'use client'
import React from "react";
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';
import { useState } from 'react';
import '../globals.css';

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
  //every year from 1990 to 2021
  var allYears = [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021] 
  var selectedCounty = repo.counties.find(county => county.name === selectedCountyName)
  var savedValue
  // Create an array of emissions for each year if emission is not found set it to 0
  if(selectedMunicipalityName == "Alla") {
    for (var i = 0; i < allYears.length; i++) {
      var year = allYears[i]
      var emissionValue
      if (emissionValue = selectedCounty.emissions[year]) {
        emissionValue = selectedCounty.emissions[year][emission] 
        savedValue = emissionValue
        emissions.push(emissionValue)} 
      else { 
        emissions.push(null)
  }
    }}
    else {
    console.log("municipality")
    var selectedMunicipality = repo.municipalities[selectedCountyName].find(municipality => municipality.name === selectedMunicipalityName)
    for (var i = 0; i < allYears.length; i++) {
      var year = allYears[i]
      var emissionValue
      if (emissionValue = selectedMunicipality.emissions[year]) {
        emissionValue = selectedMunicipality.emissions[year][emission] 
        savedValue = emissionValue
        emissions.push(emissionValue)}
      else { 
        emissions.push(null)
      }
    }
  }

  return (
    <Line
    className="chart"
    data = {{
      labels: allYears,
      datasets: [
        {
          label: 'Emissions',
          data: emissions,
          spanGaps: true,

        }, 
      ],
    }} 
    onContextMenu={update} 
    id="chart"
    
    options={{
      maintainAspectRatio: true,
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    }}>
    </Line>
  );
}