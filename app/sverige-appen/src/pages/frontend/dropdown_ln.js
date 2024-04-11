import React from 'react';

export default function Dropdown_Ln({counties}) {
    const arr = ["All"]
    console.log(counties.counties.counties)
    for (let i = 0; i < counties.counties.counties.length; i++) {
        console.log(counties.counties.counties[i].name)
        arr.push(counties.counties.counties[i].name)
    }
 

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