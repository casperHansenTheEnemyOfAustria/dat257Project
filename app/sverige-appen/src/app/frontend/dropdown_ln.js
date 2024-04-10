import React from 'react';
import { CountyList } from '../backend/countyList';

export default function Dropdown_Ln() {
    const arr = ["Blekinge", "Dalarna", "Gotland", "Gävleborg", "Halland", "Jämtland", "Jönköping", "Kalmar", "Kronoberg", "Norrbotten", "Skåne", "Stockholm", "Södermanland", "Uppsala", "Värmland", "Västerbotten", "Västernorrland", "Västmanland"];
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