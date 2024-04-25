import React from 'react';

export default function Dropdown(data, text, className) {
    const arr = {data}
    

    return (
        <div class='custom-select'>
            <label htmlFor="arrayDropdown" className="selectLabel">{text}</label>
            <select 
            id="arrayDropdown" 
            className = {className}
            >
                {arr.map((op, i) => (
                    <option key={i} value={op}>{op}</option>
                ))}
            </select>
        </div>
    );
};

