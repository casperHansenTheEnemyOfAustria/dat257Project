import { Database, OPEN_READONLY } from 'sqlite3';
import { County } from './county';


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
        //Close the connection to the database
        .finally(() => {
            this.db.close();
        });
    }


    public async getCountyByName(name: string): Promise<County> {
        //Query to get all the emissions for a county, TODO: turn into parameterized query for security reasons
        var query = `SELECT * FROM emissions WHERE Län = ${name}`;

        //Creates a default County object if the query returns no rows
        let output = new County(name, new Map<number, number[]>());
        //Run the query, runAll() returns a promise so have to be awaited, also because the querys are async
        var rows = await this.runAll(query);
        //Emissions is a map of years and lists of emissions that year
        var emissions = new Map<number, number[]>();
        //Iterate over the rows of the query and append each emissions to it's year.
        rows.forEach((row: any) => {
            if (emissions.has(row.År)) {
                emissions.get(row.År)?.push(row.Value);
            }
            else {                
                emissions.set(row.År, [row.Value]);
            }
        });
        output = new County(name, emissions=emissions);

       return output;
    }

    public getAllCountyNames(){
        this.db = new Database('database.db');
        var query = `SELECT * Län FROM emissions`;
        var rv: any[] = [];
        this.runAll(query).then((value) => {
            rv = value;
        });
        this.db.close();
        return rv;
    }
}