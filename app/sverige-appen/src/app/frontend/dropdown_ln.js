import React from 'react';
import { CountyList } from '../backend/countyList';

export default function Dropdown_Ln() {
    var countyList = new CountyList();
    var arr = countyList.getCountyNames();
    console.log("loook")
    console.log(arr);
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