// a class that represents a county that has a name, a map of strings for info and a map of integers and lists of floats for emissions


export class County {
    name: string;
    info: Map<string, string>;
    emissions: Map<number, number[]>;


    constructor(name: string, emissions: Map<number, number[]>){
        this.name = name;
        this.info = new Map<string, string>(); // TODO fetch from db
        this.emissions = emissions; // TODO fetch from db
    }

    // returns the info map of the county
    getInfo(): Map<string, string> {
        return this.info;
    }

    getCountyEmissionsByYear(n: number): number[] {
        return this.emissions.get(n) as number[];
    }
    getCountyEmissionsByYearAndGas(year: number, gas: number): number {
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
            info: Array.from(this.info.entries()),
            emissions: Array.from(this.emissions.entries()).reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {} as { [key: number]: number[] }),
        };
    }
}