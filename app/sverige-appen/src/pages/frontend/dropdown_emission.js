import React from 'react';

export default function Dropdown_Emission() {
    const arr = ["All CO2 ekv", "NO2"];
    // CountyList;

    return (
        <div class='custom-select'>
            <label htmlFor="arrayDropdown" className="selectLabel">Emission type</label>
            <select 
            id="arrayDropdown" 
            className= "emissionDropdown"
            >
                {arr.map((op, i) => (
                    <option key={i} value={op}>{op}</option>
                ))}
            </select>
        </div>
    );
}