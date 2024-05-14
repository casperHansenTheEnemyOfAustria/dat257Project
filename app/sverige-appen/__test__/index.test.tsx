import { render } from '@testing-library/react';
import {County} from '../src/app/backend/county'
import {dbConnection} from '../src/app/backend/dbConnection'

// test that the information is correctly fetched from the database especially getting a countyimport { DbConnection } from './dbConnection'; // adjust this import to your actual file structure

jest.mock('./dbConnection', () => {
    return {
      __esModule: true,
      DbConnection: jest.fn().mockImplementation(() => {
        return {
          runAll: jest.fn().mockImplementation((query) => {
            if (query.includes('Kommun')) {
              return Promise.resolve([
                { Year: 2000, Emission: 100 },
                { Year: 2001, Emission: 200 },
                // ... more mock data ...
              ]);
            }
          }),
        };
      }),
    };
  });
  
  describe('DbConnection', () => {
    it('getMunicipality returns correct data', async () => {
      const db = dbConnection.getInstance();
      const municipality = await db.getMunicipality('Test');
  
      expect(municipality.name).toBe('Test');
      expect(municipality.emissions.get(2000)).toEqual([100]);
      expect(municipality.emissions.get(2001)).toEqual([200]);
      // ... more assertions ...
    });
  });