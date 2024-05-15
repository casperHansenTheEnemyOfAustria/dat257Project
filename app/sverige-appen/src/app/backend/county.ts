
// a class that represents a county that has a name, a map of strings for info and a map of integers and lists of floats for emissions
import { get } from "http";
import { dbConnection } from "./dbConnection";
import { Municipality } from "./minicipality";
import { PHASE_PRODUCTION_BUILD } from "next/dist/shared/lib/constants";
import { Info } from "./info";
/**
 * A class that represents a county that has a name,
 *  a map of strings for info and a map of integers and lists of floats for emissions
 * @class
 * @classdesc A class representing a county
 * @property {string} name - The name of the county
 * @property {Map<string, string>} info - A map of strings for info
 * @property {Map<number, number[]>} emissions - A map of integers and lists of floats for emissions
 * @property {Promise<string[]>} municipalities - A promise of a list of the names of the municipalities in the county
 * @property {dbConnection} db - A connection to the database
 * @method getMunicipalityNames - A method that returns a list of the names of the municipalities in the county
 * @method toJSON - A method that returns a json serializable representation of the county
 * 
 */
export class County {
    private name: string;
    private info: Info;
    private emissions: Map<number, number[]>;
    private municipalities: Promise<string[]>;
    private db: dbConnection;
    constructor(name: string, emissions: Map<number, number[]>, info: Info){
        this.db = dbConnection.getInstance();
        this.name = name;
        this.info = info; // Fetching is done in getServerSideProps
        this.emissions = emissions; // TODO fetch from db
        this.municipalities = this.db.getMunicipalitiesInCounty(name);
    }

    /**
     * 
     * @returns a list of the names of the municipalities in the county
     */
    async getMunicipalityNames(): Promise<string[]> {
        return await this.municipalities;
    }

    public setInfo(info: Info): void {
        this.info = info;
    }


    //temp debug function
    getCountyInfo(): Info {
        return this.info;
    }
    /**
     * 
     * @returns a json serializable representation of the county including all its elements
     */
    async toJSON() {
        return {
            name: this.name,
            //info: Array.from(this.info.entries()),
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
            emissions: Array.from(this.emissions.entries()).reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {} as { [key: number]: number[] }),
            years: Array.from(this.emissions.keys()),
            municipalities: await this.municipalities
        };
    }
}