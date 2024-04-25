import React from 'react';



export default function Dropdown_Ln({counties}) {
    const arr = []

    for (let i = 0; i < counties.counties.counties.length; i++) {

        arr.push(counties.counties.counties[i].name)
    }


    return (
        <div class='custom-select'>
            <label htmlFor="arrayDropdown" className="selectLabel">County</label>
            <select 
            id="arrayDropdown" 
            className= "countyDropdown"
            >
                {arr.map((op, i) => (
                    <option key={i} value={op}>{op}</option>
                ))}
            </select>
        </div>
    );
}