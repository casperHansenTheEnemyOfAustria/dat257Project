import React from 'react';

export default function Dropdown_Ln({counties}) {
    const arr = ["All"]
    console.log(counties)

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