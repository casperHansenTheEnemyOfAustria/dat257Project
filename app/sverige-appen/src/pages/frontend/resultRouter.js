import Map from './map.jsx';

export function updateMap() {
    Map.setState({county: "Stockholm", municipality: "Stockholm", emission: "CO2", year: 2019});
}