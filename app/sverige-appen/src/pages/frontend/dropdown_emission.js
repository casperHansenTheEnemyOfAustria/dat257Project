import React from 'react';

export default function Dropdown_Emission({repo}) {
    const arr = repo.repo.emissionTypes

    // CountyList;

    return (
        <div class='custom-select'>
            <label htmlFor="arrayDropdown" className="selectLabel ">Emission type</label>
            <select 
            id="arrayDropdown" 
            className= "dropdown emissionDropdown"
            >
                {arr.map((op, i) => (
                    <option key={i} value={op}>{op}</option>
                ))}
            </select>
        </div>
    );
}