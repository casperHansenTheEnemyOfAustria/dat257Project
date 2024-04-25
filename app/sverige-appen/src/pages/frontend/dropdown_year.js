'use client'
import React from 'react';

export default function Dropdown_year({counties}) {
    var years = counties.repo.counties[0].years
    
    const arr = years
    // CountyList;

    return (
        <div class='custom-select'>
            <select 
            id="arrayDropdown" 
            className= "yearDropdown"
            >
                {arr.map((op, i) => (
                    <option key={i} value={op}>{op}</option>
                ))}
            </select>
        </div>
    );
}