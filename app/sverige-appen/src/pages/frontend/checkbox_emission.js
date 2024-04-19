import React from 'react';
import '/home/carl/Documents/dat257Project/app/sverige-appen/src/pages/globals.css';

export default function Checkbox_Emission() {
    const arr = ["All CO2 ekv", "NO2"];

    const handleCheckboxChange = (event) => {
        // replace the console.log with what you want to do when the checkbox is checked or unchecked
    };

    return (
        <div className='custom-select'>
            {arr.map((op, i) => (
                <div key={i}>
                    <input 
                        type='checkbox'
                        id={`checkbox${i}`} 
                        className= "emissionText"
                        value={op}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor={`checkbox${i}`} className='emissionText' >{op}</label>
                </div>
            ))}
        </div>
    );
}