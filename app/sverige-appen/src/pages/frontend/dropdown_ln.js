import React from 'react';

export default function Dropdown_Ln() {
    
    var arr =[1]
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