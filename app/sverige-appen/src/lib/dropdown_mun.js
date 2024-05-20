import { Grid } from '@mui/material';
import React from 'react';
import { useState } from 'react';



export default function Dropdown_Mun({counties}) {
    const arr = []
    const [count, setCount] = useState(0);
    const update= () => {
        setCount(count + 1);
      };
    
    // for all jeys push them to arr 
    // for (let i = 0; i < counties.counties.municipalities.length;) {
    //     arr.push(counties.counties.municipalities[i])
    // }
    var currentCounty = counties.counties.currentSearch.county

    var currentMunicipalities = counties.counties.municipalities[currentCounty]

    for (let i = 0; i < currentMunicipalities.length; i++) {
        arr.push(currentMunicipalities[i].name )
    }

    arr.sort()

    return (
        <Grid item xs={12}>
            <div class='custom-select'>
                <Grid item xs={12}>
                    <label htmlFor="arrayDropdown" className="selectLabel">Kommun</label>
                    <select 
                        id="arrayDropdown" 
                        className= "dropdown muniDropdown" onClick={update}
                    >
                        {arr.map((op, i) => {
                            if (op === "Alla") {
                                return <option key={i} value={op} selected>{op}</option>;
                            } else {
                                return <option key={i} value={op}>{op}</option>;
                            }
                        })}
                    </select>
                </Grid>
            </div>
        </Grid>
    );
}