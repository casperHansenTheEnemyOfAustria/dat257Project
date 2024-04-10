import React from 'react';

export default function LnNamn_Dropdown() {
    const arr = ["Courses here","Frontend Training","Backend Training","Java Training","Ethical Hacking"];

    return (
        <div>
            <select id="arrayDropdown" style={{outline:"none", padding: "0.4rem", borderRadius: "5px", border: "none", boxShadow: "0 0 10px rgb(202, 202, 202)", margin: "0.8rem"}}>
                {arr.map((op, i) => (
                    <option key={i} value={op}>{op}</option>
                ))}
            </select>
        </div>
    );
}