/**
 * Class that holds the information about the majorities and population of the different regions.
 * This is just a map and could be replaced by a custom type in the future.
 */
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