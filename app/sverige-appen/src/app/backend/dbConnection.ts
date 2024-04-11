import { Database, OPEN_READONLY } from 'sqlite3';
import { County } from './county';
import { promises } from 'dns';


export class dbConnection {
    private static instance: dbConnection;
    private db: Database;


    private constructor() {
        this.db = new Database('database.db', OPEN_READONLY);
    }

    public static getInstance(): dbConnection {
        
        if (!dbConnection.instance) {
            dbConnection.instance = new dbConnection();
        }
        return dbConnection.instance;
    }

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
        rows.forEach((row: any) => {
            console.log("heyhey")
            if (emissions.has(row.År)) {
                console.log(row.Value);
                emissions.get(row.År)?.push(row.Value);
            }
            else {                
                emissions.set(row.År, (row.Value, row["Emission type"]));
            }
        });

        let output = new County(name, emissions=emissions);

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
        console.log(rows);
        var municipalities: string[] = [];
        rows.forEach((row: any) => {
            municipalities.push(row.Kommun);
        });
        return municipalities;
    }

    /**
     * 
     * @param municipality name of the municipality
     * @returns a map of years and emissions for the municipality
     */

    public async getMunicipalityEmissions(municipality: string): Promise<Map<number, number[]>> {
        var query = `SELECT År, Value FROM emissions WHERE Kommun = '${municipality}'`;
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
        return emissions;
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
}