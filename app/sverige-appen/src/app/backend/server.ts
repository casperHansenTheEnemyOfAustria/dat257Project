import type { InferGetServerSidePropsType, GetServerSideProps, GetStaticProps } from 'next'
import {CountyList} from './countyList'
import {County} from './county'
import {dbConnection} from './dbConnection'
type Repo = {
  counties: County[]
}
 
export const getStaticProps = (async () => {
  // Fetch data from external API
    const db = dbConnection.getInstance()
    const countyNames = await  db.getAllCounties()
    const counties: County[] = []
    for (var i = 0; i < countyNames.length; i++) {
        var county = await db.getCounty(countyNames[i])
        
        counties.push(county)
    }
    console.log("hi")

    const repo: Repo ={
        counties : counties
    } 

  // Pass data to the page via props
  return { props: { repo } }
}) satisfies GetStaticProps<{ repo: Repo }>