"use strict";
// a class that represents a county that has a name, a map of strings for info and a map of integers and lists of floats for emissions
Object.defineProperty(exports, "__esModule", { value: true });
exports.County = void 0;
class County {
    constructor(name) {
        this.name = name;
        this.info = new Map(); // TODO fetch from db
        this.emissions = new Map(); // TODO fetch from db
    }
    // returns the info map of the county
    getInfo() {
        return this.info;
    }
    getCountyEmissionsByYear(n) {
        return this.emissions.get(n);
    }
    getCountyEmissionsByYearAndGas(year, gas) {
        var _a;
        var output = (_a = this.emissions.get(year)) === null || _a === void 0 ? void 0 : _a[gas];
        if (output == undefined) {
            return 0;
        }
        return output;
    }
}
exports.County = County;
