'use client'

import Image from "next/image";

import {dbConnection} from "@/app/backend/dbConnection";

import { ThemeProvider } from "@material-ui/core";
import type {InferGetStaticPropsType, InferGetServerSidePropsType, GetServerSideProps, GetStaticProps } from 'next'

import "./globals.css";
import React from 'react';

import Resultbox from '../lib/result';
import Dropdown_Ln from "../lib/dropdown_ln";
import Dropdown_Year from '../lib/dropdown_year';
import Dropdown_Mun from '../lib/dropdown_mun';
import Dropdown_Emission from '../lib/dropdown_emission';
import Chart from '../lib/chart';
import GlobalGoal from './frontend/globalGoal.js';

import { Header } from '../lib/header';
import { updateResult } from '../lib/result';
import { Municipality } from "@/app/backend/minicipality";
import dynamic from "next/dynamic";
import Grid from '@material-ui/core/Grid';



const SwedishMap = dynamic(() => import('../lib/map.jsx'), { ssr: false })
const LineChart = dynamic(() => import('../lib/chart.js'), { ssr: false })


type Repo = {
  counties: any []
  municipalities: any
  emissionTypes: any 
  currentSearch:any
}
 
type municipalityJSONlist = {
  name: string;
  info: {majorities: { [key: number]: string[]; }};
  emissions: {
    [key: number]: number[];
  };
  years: number[];

}[];
/* ---  fetching from the backend --- */
/**
 * the getServerSideProps function that fetches the data from the database and returns it as props
 * @returns a repo with counties: a list of county objects, municipalities: a map of county names and lists of municipality objects
 */
export const getServerSideProps = (async () => {
  // Fetch data from external API
  const db = dbConnection.getInstance()
  const countyNames = await db.getAllCounties() // get all county names
  var counties: any[] = [] // list of counties
  var countyMunicipalityMap = new Map<string, any[]>() // map of county names to list of municipalities
  var municipalitiesArray// map of municipalities but json
  for (var i = 0; i < countyNames.length; i++) {
    var county = await db.getCounty(countyNames[i])
    counties.push(await county.toJSON())
    var municipalityNames = await county.getMunicipalityNames()
    var municipalitiesPerCounty: municipalityJSONlist = getMunicipalitiesPerCounty();
    countyMunicipalityMap.set(countyNames[i], municipalitiesPerCounty)
  }

  // this makes muicipalities into a list of json objects with counties as keys 
  municipalitiesArray =Array.from(countyMunicipalityMap.entries()).reduce((obj, [key, value]) => {

    obj[key] = value;
    return obj;
  }, {} as { [key: string]: any[] })


  const repo: Repo = {
    counties: counties,
    municipalities: municipalitiesArray,
    emissionTypes: await db.getEmissionTypes(),
    currentSearch: {county: "Alla", year: 1990, emission: "", municipality: "Alla"}

  }

  // Pass data to the page via props
  return { props: { repo } }

  /* --- Helper functions --- */
  function getMunicipalitiesPerCounty(): municipalityJSONlist {
    var municipalitiesPerCounty: municipalityJSONlist = [];
    municipalityNames.forEach(async (municipality) => {
      municipalitiesPerCounty.push(((await db.getMunicipality(municipality)).toJSON()));
    });
    return municipalitiesPerCounty;
  }
  
  
}) satisfies GetServerSideProps<{ repo: Repo }>
/* --- Visuals --- */ 

export default function Home({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>)  {
  if (repo == undefined || !repo.counties || !repo.municipalities || !repo.emissionTypes || !repo.currentSearch) {
    return {
      counties : [],
      municipalities: [],
      emissionTypes: [],
      currentSearch: {county: "Alla", year: 1990, emission: "", municipality: "Alla"}
    }
  }
  return (
    <main>
      <Grid container spacing={0}>
      <div className="gradient"></div>
          <Grid item xs={4} className="MapGrid">
            <SwedishMap repo = {repo} />
          </Grid>
        <Grid item xs={8} className="InfoGrid">
          <Grid item xs={8} className="InfoGrid">
            <Header/>
          </Grid>
          <Grid item xs={8} className="ButtonsGrid">
            <div className="buttons">
              <Dropdown_Year counties={{repo:repo}}/>
              <Dropdown_Ln counties={{counties:repo}} />
              <Dropdown_Mun counties={{counties:repo}} />
              <Dropdown_Emission repo = {{repo: repo}} />
              <a
                className="searchButton"
                target="_blank"
                rel="noopener noreferrer">
                <button onClick={() => clickedSearch(repo)}>
                <h2 className="">
                  Search{" "}
                  <span className="searchArrow">
                    -&gt;
                  </span>
                </h2>
                </button>
              </a>
            </div>
          </Grid>
          <Grid item xs={8} className="ResultGrid">
          <a className="resultBox">
            <div>
              <Resultbox counties = {{counties: repo}}/>
            </div>
          </a>
          </Grid>
          <Grid item xs={6} className="ChartGrid">
            <div> 
              <Chart repo ={repo}/>

              <GlobalGoal/>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
}



/* Backend connection */

function clickedSearch(repo: Repo) {
  var query = document.getElementById("result")
  query?.scrollIntoView({behavior: "smooth"})
  const result_year:any = document.getElementsByClassName("yearDropdown")[0]
  const result_ln: any = document.getElementsByClassName("countyDropdown")[0]
  const result_emission:any = document.getElementsByClassName("emissionDropdown")[0] 
  const result_mun:any= document.getElementsByClassName("muniDropdown")[0]
  

  var year= result_year.value
  var ln = result_ln.value
  var emission = result_emission.value
  var mun = result_mun.value

  


  
  if(ln != repo.currentSearch.county){
    mun = 'Alla'
  }
  updateResult(repo, ln,year, emission, mun) 

  repo.currentSearch = {county: ln, year: year, emission: emission, municipality: mun}

  document.getElementsByTagName("g")[0].childNodes[0]?.dispatchEvent(new MouseEvent("contextmenu",{bubbles: true}))
  document.getElementById("chart")?.dispatchEvent(new MouseEvent("contextmenu",{bubbles: true}))

}
