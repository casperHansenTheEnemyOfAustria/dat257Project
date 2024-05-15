export class Info {
    private majorities: Map<number, string[]>;
    private population: Map<number, number>;
    constructor(info: Map<number, string[]>, population: Map<number, number>) {
        this.majorities = info;
        this.population = population;
    }

    public getMajorities(): Map<number, string[]>{
        return this.majorities;
    }

    public getPopulation(): Map<number, number>{
        return this.population;
    }
}