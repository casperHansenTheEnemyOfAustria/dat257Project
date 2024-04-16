import Image from "next/image";

import {dbConnection} from "@/app/backend/dbConnection";


import type {InferGetStaticPropsType, InferGetServerSidePropsType, GetServerSideProps, GetStaticProps } from 'next'

import "./globals.css";
import React from 'react';
import ReactDOM from 'react-dom';

import Dropdown from './frontend/dropdown';
import LnNamn_Dropdown from './frontend/dropdown_ln';
import Resultbox from './frontend/result';
import Dropdown_Ln from "./frontend/dropdown_ln";
import Dropdown_Year from './frontend/dropdown_year';
import Dropdown_Emission from './frontend/dropdown_emission';

import { Header } from './frontend/header';
import { updateResult } from './frontend/result';
import { Municipality } from "@/app/backend/minicipality";



type Repo = {
  counties: any []
  municipalities: any []
}
 
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


    const repo: Repo ={
        counties : counties,
        municipalities: municipalities
    } 
    



  // Pass data to the page via props
  return { props: { repo } }
}) satisfies GetServerSideProps<{ repo: Repo }>


export default function Home({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>)  {


  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          First draft MVP&nbsp;
        </p>
        
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          
          </div>

      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">

        <Header/>

      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        
          
          <Dropdown_Year
          counties={{repo:repo}} />


          <Dropdown_Ln 
            counties={{counties:repo}} />,


          <Dropdown_Emission />

        <a
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button onClick={() => clickedSearch(repo)}>
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Search{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
            Chose a county to see the emission status
          </p>
          </button>
        </a>
      </div>

        <a className=""
        id="result"
        >
          <div>
            <Resultbox
            counties = {{counties: repo}}/>
          </div>
        </a>
    </main>
  );
}

function clickedSearch(repo: Repo) {
  var query = document.getElementById("result")
  query?.scrollIntoView({behavior: "smooth"})
  const result_year = document.getElementsByClassName("yearDropdown")[0]
  
  const result_ln = document.getElementsByClassName("countyDropdown")[0]
  const result_emission = document.getElementsByClassName("emissionDropdown")[0] 
  
 
  var year= result_year.value
  var ln = result_ln.value
  var emission = result_emission.value
  if (emission == "NO2"){
    emission = 1
  }else{
    emission = 0
  }

  updateResult(repo, ln,year, emission) 

}
