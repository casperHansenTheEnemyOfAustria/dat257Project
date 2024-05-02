import React from 'react';

export default function Dropdown({arr, text, className}) {

    const data = arr.repo
    console.log('arr is ', arr)
    console.log('data is: ', data)
    return (
        <div class='custom-select'>
            
            <label htmlFor="arrayDropdown" className="selectLabel">{text}</label>
            <select 
            id="arrayDropdown" 
            className = {className}
            >
                {data.map((op, i) => (
                    <option key={i} value={op}>{op}</option>
                ))}
            </select>
        </div>
    );
};

