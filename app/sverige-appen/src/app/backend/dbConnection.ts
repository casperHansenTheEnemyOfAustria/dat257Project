import { Database } from 'sqlite3';
import { County } from './county';


export class dbConnection {
    private static instance: dbConnection;
    private db: Database;


    private constructor() {
        this.db = new Database('database.db');
    }

    public static getInstance(): dbConnection {
        
        if (!dbConnection.instance) {
            dbConnection.instance = new dbConnection();
        }
        return dbConnection.instance;
    }

    public runGet(query: string): any {
        this.db = new Database('database.db');
        this.db.serialize(() => {
            this.db.get(query, (err, row) => {
                if (err) {
                    throw err;
                }
                return row;
            });
        });
        this.db.close();
    }

    private async runAll(query: string): Promise<any> {
        this.db = new Database('database.db');
     
        var rv: any;
  
        
        
        rv = await this.db.all(query, (err, rows) => {
            if (err) {
                throw err;
            }
            rv = rows;
            
        });
    
        
        this.db.close();
        return rv;
        

    }

    public getCountyByName(name: string): County {
        var query = `SELECT * FROM emissions WHERE Län = ${name}`;
        var output = new County(name);
        var row = this.runAll(query);
        // dereferencing promises from async function
        // while (output === undefined) {
        row.then((value) => {
            output = new County (value.name);
        });
        // }

       return output;
    }
}