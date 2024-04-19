// a class that represents a county that has a name, a map of strings for info and a map of integers and lists of floats for emissions

import { get } from "http";
import { dbConnection } from "./dbConnection";
import { Municipality } from "./minicipality";


export class County {
    private name: string;
    private info: Map<string, string>;
    private emissions: Map<number, number[]>;
    private municipalities: Promise<string[]>;
    private db: dbConnection;


    constructor(name: string, emissions: Map<number, number[]>){
        this.db = dbConnection.getInstance();
        this.name = name;
        this.info = new Map<string, string>(); // TODO fetch from db
        this.emissions = emissions; // TODO fetch from db
        this.municipalities = this.db.getMunicipalitiesInCounty(name);
  
    }


    // returns the emissions map of the county
    async getMunicipalityNames(): Promise<string[]> {

        return await this.municipalities;
    }

 

    async toJSON() {
        return {
            name: this.name,
            info: Array.from(this.info.entries()),
            emissions: Array.from(this.emissions.entries()).reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {} as { [key: number]: number[] }),
            years: Array.from(this.emissions.keys()),
            municipalities: await this.municipalities
        };
    }
}