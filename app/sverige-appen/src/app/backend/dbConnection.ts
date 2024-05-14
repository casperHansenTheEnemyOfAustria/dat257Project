import { Database, OPEN_READONLY } from 'sqlite3';
import { County } from './county';
import { Municipality } from './minicipality';
/**
 * A class representing a connection to the database
 * @class
 * @classdesc A class representing a connection to the database SINGLETON
 * @property {Database} db - A connection to the database
 * @method getInstance - A method that returns the instance of the database connection
 * @method getCounty - A method that returns a county object with the name of the county and a map of emissions for each year
 * @method getAllCounties - A method that returns a list of all counties in the database
 * @method getMunicipalities - A method that returns a list of all municipalities in the database
 * @method getMunicipalitiesInCounty - A method that returns a list of all municipalities in the county
 * @method getMunicipalityEmissions - A method that returns a map of years and emissions for the municipality
 * @method getEnumeratedEmissions - A method that returns a map of emissions and what their index is in the database/application wide
 * 
 * 
 */
export class dbConnection {
    private static instance: dbConnection;
    private db: Database;
    private constructor() {
        this.db = new Database('database.db', OPEN_READONLY);
    }
    /**
     * singleton pattern
     * @returns the instance of the database connection
     */
    public static getInstance(): dbConnection {
        
        if (!dbConnection.instance) {
            dbConnection.instance = new dbConnection();
        }
        return dbConnection.instance;
    }
    /**
     * 
     * @param query a query to be run on the database
     * @returns a promise that resolves to the rows of the query (single object)
     */
    private async runGet(query: string): Promise<any> {
        this.db = new Database('database.db');
     
        var rv: any;
  
        rv = await this.db.get(query, (err, rows) => {
            if (err) {
                throw err;
            }
            rv = rows;
            
        });
    
        
        this.db.close();
        return rv;
    }
    /**
     * 
     * @param query a query to be run on the database
     * @returns a promise that resolves to the rows of the query (all objects)
     */
    private runAll(query: string): Promise<any> {
        
        //Open a connection to the database
        this.db = new Database('database.db');
  
        //Return a promise that resolves to the rows of the query
        return new Promise((resolve, reject) => {
         this.db.all(query, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
            });
        })
    }
    /**
     * 
     * @param name name of County
     * @returns A county object with the name of the county and a map of emissions for each year
     * @todo: Add info 
     */
    public async getCounty(name: string): Promise<County> {
        //Query to get all the emissions for a county, TODO: turn into parameterized query for security reasons
        var query = `SELECT * FROM emissions WHERE Län = ${"'"+name+"'"}`;
        //Run the query, runAll() returns a promise so have to be awaited, also because the querys are async
        var rows = await this.runAll(query);
        //Emissions is a map of years and lists of emissions that year
        
        var emissions = new Map<number, number[]>();
        //Iterate over the rows of the query and append each emissions to it's year.
        // {År: {Emission type: Value}}
        var prev: string = ""
        rows.forEach((row: any) => {
            //console.log("heyhey")
            if (emissions.has(row.År)) {
               
                    
                    var list: any[] = []
                    list = list.concat(emissions.get(row.År) as any[])
                    if(row["Kommun"] == "Alla"){
                        list.push(row.Value)
                        emissions.set(row.År, list);
                    }else{
                        
                    }
            }
            else {                
                emissions.set(row.År, (row.Value));
            }
        });

        let output = new County(name, emissions);

    
        return output;
    }
    /**
     * 
     * @param name name of the municipality
     * @returns a municipality object with the name of the municipality and a map of emissions for each year
     * @todo: Add info
     */
    async getMunicipality(name: string): Promise<Municipality> {
        var query = `SELECT * FROM emissions WHERE Kommun = ${"'"+name+"'"}`;
        var rows = await this.runAll(query);
        var emissions = new Map<number, number[]>();
        rows.forEach((row: any) => {
            if (emissions.has(row.År)) {
                emissions.get(row.År)?.push(row.Value);
            }
            else {                
                emissions.set(row.År, [row.Value]);
            }
        });
        let output = new Municipality(name, emissions);
        return output;
    }
    /**
     * 
     *
     * @returns a list of all counties in the database
     */
    public async getAllCounties(): Promise<string[]> {
        //Query to get all the emissions for a county, TODO: turn into parameterized query for security reasons
        var query = `SELECT DISTINCT Län FROM emissions`;
        //Run the query, runAll() returns a promise so have to be awaited, also because the querys are async
        var rows = await this.runAll(query);
        //Create an array of County objects
        var counties: string[] = [];
        //Iterate over the rows of the query and append each county to the array
        rows.forEach((row: any) => {
            counties.push(row.Län);
        });
        return counties;
    }
    
    /**
     * 
     * @returns a list of all municipalities in the database
     */
    public async getMunicipalities(): Promise<string[]> {
        //Query to get all the emissions for a county, TODO: turn into parameterized query for security reasons
        var query = `SELECT DISTINCT Kommun FROM emissions`;
        //Run the query, runAll() returns a promise so have to be awaited, also because the querys are async
        var rows = await this.runAll(query);
        //Create an array of County objects
        var municipalities: string[] = [];
        //Iterate over the rows of the query and append each county to the array
        rows.forEach((row: any) => {
            municipalities.push(row.Kommun);
        });
        return municipalities;
    }
    /**
     * 
     * @param county name of the county
     * @returns a list of all municipalities in the county
     */
    public async getMunicipalitiesInCounty(county: string): Promise<string[]> {
        var query = `SELECT DISTINCT Kommun FROM emissions WHERE Län = '${county}'`;
        var rows = await this.runAll(query);
      
        var municipalities: string[] = [];
        rows.forEach((row: any) => {
            municipalities.push(row.Kommun);
        });
        return municipalities;
    }
    /**
     * 
     * @returns A map of emissions and what their index is in the database/application wide. Maybe useful...
     */
    public async getEnumeratedEmissions(): Promise<Map<string, number>> {
        var query = `SELECT DISTINCT "Emission type" FROM emissions`;
        var rows = await this.runAll(query);
        var emissions = new Map<string, number>();
        let index = 0;
        rows.forEach((row: any) => {
            emissions.set(row["Emission type"], index);
            index++;
        });
        return emissions;
    }
    /**
     * 
     * @returns a list of all emission types in the database this is for iterating through them
     * 
     */    
    public async getEmissionTypes(): Promise<string[]> {
        var query = `SELECT DISTINCT "Emission type" FROM emissions`;
        var rows = await this.runAll(query);
        var emissions: string[] = [];
        rows.forEach((row: any) => {
            emissions.push(row["Emission type"]);
        });
        return emissions;
    }

    //Returns a map of 
    public async getPartiesPerRegion(region: string): Promise<Map<number, string[]>> {
        var query = `SELECT År, M, C, L, KD, S, V, MP, SD, ÖP  FROM styren_regions WHERE Län = ${"'"+region+"'"}`;
        var rows = await this.runAll(query);

        var styren = new Map<number, string[]>();

        rows.forEach((row: any) => {
            let year = row.År;
            let parties = [row.M, row.C, row.L, row.KD, row.S, row.V, row.MP, row.SD, row.ÖP];
            parties = parties.filter(e => e);
            styren.set(year, parties);
        });
        return styren;
    }

}