import React from 'react';
import { Grid } from '@mui/material';

export default function Dropdown_Emission({repo}) {
    const arr = repo.repo.emissionTypes

    // CountyList;

    return (
        <Grid item xs={12}>
            <div class='custom-select'>
                <Grid item xs={12}>
                    <label htmlFor="arrayDropdown" className="selectLabel ">Utsläpp</label>
                    <select 
                    id="arrayDropdown" 
                    className= "dropdown emissionDropdown">
                        {arr.map((op, i) => (
                            <option key={i} value={op}>{op}</option>
                        ))}
                    </select>
                </Grid>
            </div>
        </Grid>
    );
}