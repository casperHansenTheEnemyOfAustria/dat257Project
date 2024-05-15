import { render } from '@testing-library/react';
import {County} from '../src/app/backend/county'
import {dbConnection} from '../src/app/backend/dbConnection'

// test that the information is correctly fetched from the database especially getting a countyimport { DbConnection } from './dbConnection'; // adjust this import to your actual file structure

jest.mock('../src/app/backend/dbConnection', () => {
    return {
        dbConnection: {
            getInstance: jest.fn(() => {
            return {
                getMunicipality: jest.fn(() => {
                return {
                    name: 'Test',
                    emissions: new Map([
                    [2000, [100]],
                    [2001, [200]],
                    ]),
                };
                }),
            };
            }),
        },
    };
  });
  
  describe('DbConnection', () => {
    it('getMunicipality returns correct data', async () => {
        var db = dbConnection.getInstance();

      const municipality = await db.getMunicipality('Test');
  
      expect(municipality.name).toBe('Test');
      expect(municipality.emissions.get(2000)).toEqual([100]);
      expect(municipality.emissions.get(2001)).toEqual([200]);
      // ... more assertions ...
    });
  });

// test that the information is correctly fetched from the database especially getting a county
jest.mock('../src/app/backend/dbConnection', () => {
    return {
        dbConnection: {
            getInstance: jest.fn(() => {
            return {
                getMunicipalitiesInCounty: jest.fn(() => {
                return ['Test'];
                } ),
                getMunicipality: jest.fn(() => {
                return {
                    name: 'Test',
                    emissions: new Map([
                    [2000, [100]],
                    [2001, [200]],
                    ]),
                };
                })
                

       
            };
            }),
        },
    };
  });
  
  


  // test that a county object is json serializable
    describe('County', () => {
        it('toJSON returns correct data', async () => {
        const county = new County('Test', new Map([
            [2000, [100]],
            [2001, [200]],
        ]));
    
        const json = await county.toJSON();
    
        expect(json.name).toBe('Test');
        expect(json.emissions[2000]).toEqual([100]);
        expect(json.emissions[2001]).toEqual([200]);
        // ... more assertions ...
        });
    });

    // testing if countys are correctly fetched from the database
    jest.mock('../src/app/backend/dbConnection', () => {
        return {
            dbConnection: {
                getInstance: jest.fn(() => {
                    return {
                        getCounty: jest.fn(() => {
                        return ['Test'];
                        }),
                        getMunicipalitiesInCounty: jest.fn(() => {
                        return ['Test'];
                        }),
                        getMunicipality: jest.fn(() => {
                        return {
                            name: 'Test',
                            emissions: new Map([
                            [2000, [100]],
                            [2001, [200]],
                            ]),
                        };
                        })


                    }
                })
            }
        }
    });

        // testing if countys are correctly fetched from the database
    describe('DbConnection', () => {
        it('getCounty returns correct data', async () => {
            var db = dbConnection.getInstance();
            const county = await db.getCounty('Test');
            expect(county).toEqual(['Test']);
        });
    });


    // testing if the list of municipalities in a county is correctly fetched from the database
    jest.mock('../src/app/backend/dbConnection', () => {
        return {
            dbConnection: {
                getInstance: jest.fn(() => {
                    return {
                        getMunicipalitiesInCounty: jest.fn(() => {
                        return ['Test'];
                        }),
                        getMunicipality: jest.fn(() => {
                        return {
                            name: 'Test',
                            emissions: new Map([
                            [2000, [100]],
                            [2001, [200]],
                            ]),
                        };
                        }),
                        getCounty: jest.fn(() => {
                        return ['Test'];
                        })
                    }
                })
            }}})

    describe('DbConnection', () => {
        it('getMunicipalitiesInCounty returns correct data', async () => {
            var db = dbConnection.getInstance();
            const municipalities = await db.getMunicipalitiesInCounty('Test');
            expect(municipalities).toEqual(['Test']);
        });
    });

jest.mock('../src/app/backend/dbConnection', () => {
    return {
        dbConnection: {
            getInstance: jest.fn(() => {
            return {
                getMunicipalitiesInCounty: jest.fn(() => {
                return ['Test'];
                }),
                getMunicipality: jest.fn(() => {
                return {
                    name: 'Test',
                    emissions: new Map([
                    [2000, [100]],
                    [2001, [200]],
                    ]),
                };
                }),
                getCounty: jest.fn(() => {
                return ['Test'];
                }),
                getMunicipalitiesInCounty: jest.fn(() => {
                return ['Test'];
                })
            };
            }),
        },
    };
  });

describe('getInstance', () => {
  it('returns correct data', () => {
    const instance = dbConnection.getInstance();

    const municipalities = instance.getMunicipalitiesInCounty();
    expect(municipalities).toEqual(['Test']);

    const municipality = instance.getMunicipality();
    expect(municipality.name).toBe('Test');
    expect(municipality.emissions.get(2000)).toEqual([100]);
    expect(municipality.emissions.get(2001)).toEqual([200]);

    const county = instance.getCounty();
    expect(county).toEqual(['Test']);
  });
});
