"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountyList = void 0;
// importing County
const county_1 = require("./county");
class CountyList {
    constructor() {
        this.counties = []; //fetch from db
    }
    // should reaturn a list of countys sorted on the chosen emissions
    getCountiesEmissionsAtYearAndIndex(year, index) {
        let output = [];
        for (var i = 0; i < this.counties.length; i++) {
            var countyName = this.counties[i];
            var county = new county_1.County(countyName);
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
exports.CountyList = CountyList;
