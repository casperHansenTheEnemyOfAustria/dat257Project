

import React from 'react';
import dynamic from 'next/dynamic'
//importing globals
import '../globals.css';
import { Grid } from '@material-ui/core';


//importing components

export const Header = () => {

   return (
    <Grid item xs={12}> 
      <div className="header"> </div>
    </Grid>
  );
} 
