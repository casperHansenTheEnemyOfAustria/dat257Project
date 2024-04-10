import React from 'react';
import { CountyList } from '../backend/countyList';

export default function Dropdown_Emission() {
    const arr = ["All", "CO2"];
    // CountyList;

    return (
        <div class='custom-select'>
            <select 
            id="arrayDropdown" 
            >
                {arr.map((op, i) => (
                    <option key={i} value={op}>{op}</option>
                ))}
            </select>
        </div>
    );
}