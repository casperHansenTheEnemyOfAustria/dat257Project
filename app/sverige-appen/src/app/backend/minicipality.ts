/**
 * Class representing a municipality
 * @class
 * @classdesc A class representing a municipality
 * @property {string} name - The name of the municipality
 * @property {Map<string, string>} info - A map of strings for info
 * @property {Map<number, number[]>} emissions - A map of integers and lists of floats for emissions
 * @method toJSON - A method that returns a json serializable representation of the municipality
 * 
 */
export class Municipality {
    private name: string;
    private info: Map<string, string>;
    private emissions: Map<number, number[]>;

    constructor(name: string, emissions: Map<number, number[]>){
        this.name = name;
        this.info = new Map<string, string>(); // TODO fetch from db
        this.emissions = emissions; // TODO fetch from db
    }


    /**
     * 
     * @returns a json serializable representation of the municipality including all its elements
     */
    toJSON() {
        return {
            name: this.name,
            info: Array.from(this.info.entries()),
            emissions: Array.from(this.emissions.entries()).reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {} as { [key: number]: number[] }),
            years: Array.from(this.emissions.keys())
        };
    }


}