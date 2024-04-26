import React from 'react';



export default function Dropdown_Mun({counties}) {
    const arr = []

    for (let i = 0; i < counties.counties.counties.length; i++) {

        arr.push(counties.counties.counties[i].name)
    }


    return (
        <div class='custom-select'>
            <label htmlFor="arrayDropdown" className="selectLabel">Municipality</label>
            <select 
            id="arrayDropdown" 
            className= "dropdown"
            >
                {arr.map((op, i) => (
                    <option key={i} value={op}>{op}</option>
                ))}
            </select>
        </div>
    );
}