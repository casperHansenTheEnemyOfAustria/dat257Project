import { Info } from "./info";

/**
 * A class representing the municipality object
 */
export class Municipality {
    name: string;
    info: Info;
    emissions: Map<number, number[]>;


    constructor(name: string, emissions: Map<number, number[]>, info: Info){
        this.name = name;
        this.info = info; // Fetching is done in getServerSideProps
        this.emissions = emissions; // TODO fetch from db
    }




    /**
     * 
     * @returns a list of the names of the municipalities in the county
     */
    getEmissions(): Map<number, number[]> {
        return this.emissions;
    }

    /**
     * @param n - the year to get the emissions for
     * @returns a list of the names of the municipalities in the county
     */
    getEmissionsByYear(n: number): number[] {
        return this.emissions.get(n) as number[];
    }

    /**
     * 
     * @param year - the year to get the emissions for
     * @param gas - the gas to get the emissions for
     * @returns the emissions for the given year and gas
     */
    getEmissionsByYearAndGas(year: number, gas: number): number {
        var output = this.emissions.get(year)?.[gas];
        if (output == undefined) {
            return 0;
        }
        return output;

    }

    // returns the name of the county

    getName(): string {
        return this.name;
    }


    toJSON() {
        return {
            name: this.name,
        
            emissions: Array.from(this.emissions.entries()).reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {} as { [key: number]: number[] }),
            years: Array.from(this.emissions.keys()),
            info: {
                majorities: Array.from(this.info.getMajorities().entries()).reduce((obj, [key, value]) => {
                    obj[key] = value;
                    return obj;
                }, {} as { [key: number]: string[] }),
                populations: Array.from(this.info.getPopulation().entries()).reduce((obj, [key, value]) => {
                    obj[key] = value;
                    return obj;
                }, {} as { [key: number]: number }) 
            },

        };
    }


}