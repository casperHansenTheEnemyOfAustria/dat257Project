import React from 'react';
import { Grid } from '@material-ui/core';



export default function Dropdown_Ln({counties}) {
    const arr = []

    for (let i = 0; i < counties.counties.counties.length; i++) {

        arr.push(counties.counties.counties[i].name)
    }

    arr.sort()


    return (
        <Grid item xs={12}>
            <div class='custom-select'>
                <Grid item xs={12}>
                    <label htmlFor="arrayDropdown" className="selectLabel">Län</label>
                    <select 
                    id="arrayDropdown" 
                    className= "dropdown countyDropdown" 
                    >
                        {arr.map((op, i) => (
                            <option key={i} value={op}>{op}</option>
                        ))}
                    </select>
                </Grid>
            </div>
        </Grid>
    );
}