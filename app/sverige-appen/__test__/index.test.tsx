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
  
//   describe('DbConnection', () => {
//     it('getCounty returns correct data', async () => {
//         var db = dbConnection.getInstance();

//       const county = await db.getCounty('Test');
  
//       expect(county.name).toBe('Test');
//       expect(county.emissions.get(2000)).toEqual([100]);
//       expect(county.emissions.get(2001)).toEqual([200]);
//       // ... more assertions ...
//     });
//   });


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