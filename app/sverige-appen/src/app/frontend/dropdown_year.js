import React from 'react';
import { CountyList } from '../backend/countyList';

export default function Dropdown_year() {
    const arr = ["2015", "2016", "2017", "2018", "2019", "2020"];
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