import { Grid } from '@material-ui/core';
import React from 'react';



export default function Dropdown_Mun({counties}) {
    const arr = []

    for (let i = 0; i < counties.counties.counties.length; i++) {

        arr.push(counties.counties.counties[i].name)
    }


    return (
        <Grid item xs={12}>
            <div class='custom-select'>
                <Grid item xs={12}>
                    <label htmlFor="arrayDropdown" className="selectLabel">Kommun</label>
                    <select 
                    id="arrayDropdown" 
                    className= "dropdown muniDropdown">
                        {arr.map((op, i) => (
                            <option key={i} value={op}>{op}</option>
                        ))}
                    </select>
                </Grid>
            </div>
        </Grid>
    );
}