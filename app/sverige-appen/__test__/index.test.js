import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import { County } from '../types'


describe('Home', () => {
    it('renders SwedishMap with correct repo prop', () => {
        var mockCounty
        var mockCountyEmissions = new Map()
        mockCountyEmissions.set(2018, [100])
        // this needs to be changed to a key value pair
      

        

        mockCounty = new County("Stockholm", mockCountyEmissions)
        mockCounty = mockCounty.toJson()

        const mockRepo = {
        counties: [mockCounty],
        emissionTypes: ['bajs'],
        municipalities: {
            Stockholm: [
            {
                name: 'Stockholm',
                emissions: {
                2018: [100],
                },
            },
            ],
        },
        currentSearch: {
            county: 'Stockholm',
            emission: 'bajs',
            municipality: 'Stockholm',
            year:1990
        },
      };
  
      const { getByTestId } = render(<main repo={mockRepo} />);
  
      const map = getByTestId('map');
      expect(map).toBeInTheDocument();
    //   expect(map.prop('repo')).toEqual(mockRepo);
    });
  });