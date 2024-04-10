// a list of county objects
// importing sqlite 

// importing County

import { County } from "./county";
import { dbConnection } from "./dbConnection";

export class CountyList {
    private counties: string[];
    private db = dbConnection.getInstance();
    constructor() {
        this.counties = []; //fetch from db
    }

   // should reaturn a list of countys sorted on the chosen emissions
    getCountiesEmissionsAtYearAndIndex(year: number, index: number):  County[] {
        let output: County[] = [];
        for (var i = 0; i < this.counties.length; i++) {
            var countyName = this.counties[i];
            var dbcounty = this.db.getCountyEmissions(countyName);
            // removing the promise from dbocunty
            var county = new County(countyName, new Map<number, number[]>());
            //fetching the emissions for the county
            dbcounty.then((value) => {
                county = value;
            });
           

            var emissions = county.getCountyEmissionsByYearAndGas(year, index);
            //insert into output in order
            //Bubbel sort for the win
            for (var j = 0; j < output.length; j++) {
                if (emissions > output[j].getCountyEmissionsByYearAndGas(year, index)) {
                    output.splice(j, 0, county);
                    break;
                }
            }
            
        }
        return output;
    }
}