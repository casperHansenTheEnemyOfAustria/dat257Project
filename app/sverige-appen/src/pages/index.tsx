import Image from "next/image";

import { dbConnection } from "@/app/backend/dbConnection";


import type { InferGetStaticPropsType, InferGetServerSidePropsType, GetServerSideProps, GetStaticProps } from 'next'

import "./globals.css";
import React from 'react';
import ReactDOM from 'react-dom';

import Dropdown from './frontend/dropdown';
import LnNamn_Dropdown from './frontend/dropdown_ln';
import Resultbox from './frontend/result';
import Dropdown_Ln from "./frontend/dropdown_ln";
import Dropdown_Year from './frontend/dropdown_year';
import Dropdown_Mun from './frontend/dropdown_mun';
import Dropdown_Emission from './frontend/dropdown_emission';

import { Header } from './frontend/header';
import { updateResult } from './frontend/result';
import { Municipality } from "@/app/backend/minicipality";
import { Container } from "postcss";
import dynamic from "next/dynamic";
import { Rectangle } from "react-leaflet/Rectangle";

const SwedishMap = dynamic(() => import('./frontend/map.jsx'), { ssr: false })


/*-- Types --*/
type Repo = {
  counties: any[]
  municipalities: { [key: string]: municipalityJSONlist }
  emissionTypes: string[]
}

 


type municipalityJSONlist = {
  name: string;
  info: [string, string][];
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
    const countyNames = await  db.getAllCounties()


    var counties: any[] = []

    var tmpMap = new Map<string, any[]>()
    for (var i = 0; i < countyNames.length; i++) {
        var county = await db.getCounty(countyNames[i])
        counties.push(await county.toJSON())
        var cnames = await county.getMunicipalityNames()
        //json serializeable way of repping the municipalities
        var temp: { name: string; info: [string, string][]; emissions: { [key: number]: number[]; }; years: number[]; }[] = []
        cnames.forEach(async (municipality) => {
          //a temp map with county name and municipalities
          temp.push(((await db.getMunicipality(municipality)).toJSON()))
        
        })
        tmpMap.set(countyNames[i], temp)
    }

    // this makes muicipalities a json serializable object
    var municipalities = Array.from(tmpMap.entries()).reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;

  }, {} as { [key: string]: any[] })



  const repo: Repo = {
    counties: counties,
    municipalities: municipalitiesJSONformatted,
    emissionTypes: await db.getEmissionTypes()

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
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  return (
    <main>

      <div className="gradient"></div>
      
      <Header/>
      
          <SwedishMap/>
        

      <div className="buttons">

        <Dropdown_Year
          counties={{ repo: repo }} />

        <Dropdown_Ln
          counties={{ counties: repo }} />


        <Dropdown_Mun
          counties={{ counties: repo }} />

        <Dropdown_Emission
        repo = {{repo: repo}} />

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

      <a className="resultBox">
        <div>
          <Resultbox
            counties={{ counties: repo }} />
        </div>
      </a>
    </main>
  );
}



/* Backend connection */

function clickedSearch(repo: Repo) {
  var query = document.getElementById("result")
  query?.scrollIntoView({ behavior: "smooth" })
  const result_year = document.getElementsByClassName("yearDropdown")[0]
  const result_ln = document.getElementsByClassName("countyDropdown")[0]
  const result_emission = document.getElementsByClassName("emissionDropdown")[0]

  console.log()
  console.log("heehee")
  var year = result_year.value
  var ln = result_ln.value
  var emission = result_emission.value
  if (emission == "NO2") {
    emission = 1
  } else {
    emission = 0
  }

  var year = result_year.value
  var ln = result_ln.value
  var emission = result_emission.value
  
  updateResult(repo, ln, year, emission)
}
