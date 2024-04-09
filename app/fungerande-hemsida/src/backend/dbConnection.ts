import { Database } from 'sqlite3';
import { County } from './county';

export class dbConnection {
    private static instance: dbConnection;
    private db: Database;

    private constructor() {
        this.db = new Database('../db/database.db');
    }

    public static getInstance(): dbConnection {
        if (!dbConnection.instance) {
            dbConnection.instance = new dbConnection();
        }
        return dbConnection.instance;
    }

    public runGet(query: string): any {
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

    private runAll(query: string): any {
        this.db.serialize(() => {
            this.db.all(query, (err, rows) => {
                if (err) {
                    throw err;
                }
                return rows;
            });
        });
        this.db.close();
    }

    public getCountyByName(name: string): County {
        var query = `SELECT * FROM emissions WHERE name = ${name}`;
        var row = this.runGet(query);
        return new County(row.name);
    }
}