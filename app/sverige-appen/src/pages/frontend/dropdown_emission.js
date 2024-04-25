import React from 'react';

export default function Dropdown_Emission({repo}) {
    const arr = repo.repo.emissionTypes

    // CountyList;

    return (
        <div class='custom-select'>
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