import { Grid } from '@material-ui/core';
import React from 'react';

export default function Dropdown_year({counties}) {
    var years = counties.repo.counties[0].years
    
    const arr = years
    // CountyList;

    return (
        <Grid item xs={12}>
            <div class='custom-select'>
                <Grid item xs={12}>
                    <label htmlFor="arrayDropdown" className="selectLabel">År</label>
                    <select 
                    id="arrayDropdown" 
                    className= "dropdown yearDropdown"
                    defaultValue="Year">
                        {arr.map((op, i) => (
                            <option key={i} value={op}>{op}</option>
                        ))}
                    </select>
                </Grid>
            </div>
            </Grid>
    );
}