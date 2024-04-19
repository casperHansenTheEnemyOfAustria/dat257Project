export class Municipality {
    private name: string;
    private info: Map<string, string>;
    private emissions: Map<number, number[]>;

    constructor(name: string, emissions: Map<number, number[]>){
        this.name = name;
        this.info = new Map<string, string>(); // TODO fetch from db
        this.emissions = emissions; // TODO fetch from db
    }



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